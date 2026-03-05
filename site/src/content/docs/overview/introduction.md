---
title: Introduction
description: What is the SpecForge Spec and why it matters for AI-agent-driven development.
---

# Introduction

The SpecForge Spec is an open format for defining AI-agent-driven development specifications. It provides a standard way to describe software projects as hierarchical structures that AI agents can understand, plan against, and execute.

## The Problem

AI agents are good at small, bounded tasks. The challenge is decomposition: how do you describe a large project in a way that preserves context, enforces ordering, and survives the limits of a single context window?

## The Solution

SpecForge Spec encodes the full decomposition graph -- Project, Specifications, Epics, Tickets -- with rich metadata per entity, in a portable, versionable file. Any compliant agent or tool can consume it.

## Status

The specification is under active development. The initial v1.0 release is planned for April 2026.
