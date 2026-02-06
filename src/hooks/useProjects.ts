'use client'

import { useState, useEffect, useCallback } from 'react'
import { projectService, type Project, type CreateProjectInput } from '@/services/projectService'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const data = await projectService.getProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(async (input: CreateProjectInput) => {
    const newProject = await projectService.createProject(input)
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    await projectService.deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { projects, loading, error, refresh: fetchProjects, createProject, deleteProject }
}
