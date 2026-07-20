---
layout: single
title: "Chapter 17: DevSecOps & Container Security"
chapter_num: "17"
summary: "The CI/CD Security Pipeline, Application Security Testing in Pipelines, Container Architecture & Isolation (Namespaces, cgroups), Container Security & Escape..."
---

*   **The CI/CD Security Pipeline:** Shifting security "left" by integrating automated validation controls directly into continuous integration and delivery pipelines, including Jenkins and GitLab runners.
*   **Application Security Testing in Pipelines:** Automating software security analysis inside active builds: checking source code for flaws (SAST), testing compiled, running apps for flaws (DAST), and identifying known vulnerable open-source libraries (SCA).
*   **Container Architecture & Isolation (Namespaces, cgroups):** Analyzing container engines (such as Docker), separating processes via Linux namespaces, limiting resource allocations via cgroups, and auditing the core daemon.
*   **Container Security & Escape Mitigation:** Protecting microservices by scanning image layers for vulnerabilities, executing containers under non-root contexts, and preventing host system access escapes.
*   **Kubernetes Cluster Security (RBAC, Network Policies):** Hardening container orchestration systems (Kubernetes), configuring cluster Role-Based Access Control (RBAC), isolating pods, and declaring logical ingress/egress Network Policies.
*   **Infrastructure as Code (IaC) Security:** Performing static scanning on declarative configuration files (such as Terraform and CloudFormation templates) to identify security misconfigurations prior to deployment.
