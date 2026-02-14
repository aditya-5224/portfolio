import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
  Dribbble,
  Figma,
  Youtube,
  Mail,
  FileText
} from 'lucide-react'

export function getLinkIcon(url) {
  if (!url) return Globe

  const urlLower = url.toLowerCase()

  // GitHub
  if (urlLower.includes('github.com')) {
    return Github
  }

  // LinkedIn
  if (urlLower.includes('linkedin.com')) {
    return Linkedin
  }

  // Twitter/X
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return Twitter
  }

  // LeetCode
  if (urlLower.includes('leetcode.com')) {
    return Code2
  }

  // YouTube
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return Youtube
  }

  // Dribbble
  if (urlLower.includes('dribbble.com')) {
    return Dribbble
  }

  // Figma
  if (urlLower.includes('figma.com')) {
    return Figma
  }

  // Portfolio/Personal website
  if (urlLower.includes('portfolio') || urlLower.includes('personal')) {
    return FileText
  }

  // Email
  if (urlLower.includes('mailto:')) {
    return Mail
  }

  // Default to globe icon
  return Globe
}
