-- =============================================
-- TEAMS MIGRATION
-- =============================================
-- Run this SQL in your Supabase SQL Editor after the initial schema

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Team invitations table
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add team_id to pages and projects
ALTER TABLE pages ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES teams(id) ON DELETE SET NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES teams(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);
CREATE INDEX IF NOT EXISTS idx_teams_created_by ON teams(created_by);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_team_id ON team_invitations(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_pages_team_id ON pages(team_id);
CREATE INDEX IF NOT EXISTS idx_projects_team_id ON projects(team_id);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;

-- Auto-update trigger for teams
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- RLS POLICIES FOR TEAMS
-- =============================================

-- Teams: SELECT for members
CREATE POLICY "Team members can view their teams" ON teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Teams: INSERT for authenticated users
CREATE POLICY "Authenticated users can create teams" ON teams
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Teams: UPDATE for owner/admin
CREATE POLICY "Team owner and admins can update team" ON teams
  FOR UPDATE USING (
    id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Teams: DELETE for owner only
CREATE POLICY "Team owner can delete team" ON teams
  FOR DELETE USING (
    id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

-- =============================================
-- RLS POLICIES FOR TEAM MEMBERS
-- =============================================

-- Team members: SELECT for fellow members
CREATE POLICY "Team members can view fellow members" ON team_members
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Team members: INSERT for owner/admin (and self-join via invitation)
CREATE POLICY "Owner and admin can add members" ON team_members
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
    OR user_id = auth.uid() -- self-join when accepting invitation
  );

-- Team members: UPDATE for owner/admin
CREATE POLICY "Owner and admin can update members" ON team_members
  FOR UPDATE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Team members: DELETE for owner/admin or self-leave
CREATE POLICY "Owner and admin can remove members, members can leave" ON team_members
  FOR DELETE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
    OR user_id = auth.uid() -- self-leave
  );

-- =============================================
-- RLS POLICIES FOR TEAM INVITATIONS
-- =============================================

-- Invitations: SELECT for team members + invitee by email
CREATE POLICY "Team members and invitees can view invitations" ON team_invitations
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Invitations: INSERT for owner/admin
CREATE POLICY "Owner and admin can create invitations" ON team_invitations
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Invitations: DELETE for owner/admin
CREATE POLICY "Owner and admin can cancel invitations" ON team_invitations
  FOR DELETE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Invitations: UPDATE for accepting (invitee sets accepted_at)
CREATE POLICY "Invitees can accept invitations" ON team_invitations
  FOR UPDATE USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- =============================================
-- UPDATE EXISTING PAGE/PROJECT POLICIES FOR TEAM ACCESS
-- =============================================

-- Pages: team members can view team pages
CREATE POLICY "Team members can view team pages" ON pages
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Pages: team editors/admins/owners can insert team pages
CREATE POLICY "Team editors can insert team pages" ON pages
  FOR INSERT WITH CHECK (
    team_id IS NULL OR
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')
    )
  );

-- Pages: team editors/admins/owners can update team pages
CREATE POLICY "Team editors can update team pages" ON pages
  FOR UPDATE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')
    )
  );

-- Pages: team owners/admins can delete team pages
CREATE POLICY "Team admins can delete team pages" ON pages
  FOR DELETE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Projects: team members can view team projects
CREATE POLICY "Team members can view team projects" ON projects
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Projects: team editors can insert team projects
CREATE POLICY "Team editors can insert team projects" ON projects
  FOR INSERT WITH CHECK (
    team_id IS NULL OR
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')
    )
  );

-- Projects: team editors can update team projects
CREATE POLICY "Team editors can update team projects" ON projects
  FOR UPDATE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')
    )
  );

-- Projects: team admins can delete team projects
CREATE POLICY "Team admins can delete team projects" ON projects
  FOR DELETE USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- =============================================
-- FUNCTION FOR MEMBER EMAILS
-- =============================================

CREATE OR REPLACE FUNCTION get_team_members_with_email(p_team_id UUID)
RETURNS TABLE(
  id UUID,
  team_id UUID,
  user_id UUID,
  role VARCHAR,
  invited_by UUID,
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  email VARCHAR
) AS $$
  SELECT
    tm.id,
    tm.team_id,
    tm.user_id,
    tm.role,
    tm.invited_by,
    tm.invited_at,
    tm.joined_at,
    au.email
  FROM team_members tm
  JOIN auth.users au ON au.id = tm.user_id
  WHERE tm.team_id = p_team_id
$$ LANGUAGE sql SECURITY DEFINER;
