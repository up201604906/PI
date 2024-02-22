# ER: Requirements Specification

> Digi2 focuses on pioneering systems and control concepts, spanning cyber-physical systems, collaborative robotics, machine learning, and human-machine interaction, all with profound societal impact. They're actively seeking imaginative researchers to contribute to a range of R&D projects, from cyber-physical systems to artificial intelligence.

## Digi2 Research Lab

The Digi2-Lab Platform is going to be enhanced and updated by a group of students as part of their PI course, with the intent of bringing more functionality for intervening actors and more dissemination of the labs research and programs.

By the end of the semester it is expected that the platform transitions to not only an informative website but also as a Laboratory Information Management System (LIMS) tool capable of external communication.

This application enables unauthenticated users to access information about ongoing projects, master's and doctoral programs, facilitating seamless communication with Dig2-Lab Human Resources for interested students. Additionally, it serves as a centralized platform for authenticated users, offering resource tracking including inventory management, communication platform access, streamlining processes, publication, and project management, all with an intuitive, minimalist approach.

Intervening actors are separated into authenticated and non-authenticated user groups with different levels of permission and access. 

Non-Authenticated Users will be able to browse normally through the website, register or login to an account.

Authenticated Users will be able to interact with job applications and have access to a personal profile which houses their information, profile picture, social media links research links and application statuses.

The System Administrator(s)/Moderator(s) will be able to make regular Authenticated Users into fellow Researchers assigning them to projects and will also be able to create new Projects. 

Projects will have dedicated pages with the project description, resources, communication links and more.

Any Researcher or System Administrator will have access to the Inventory and will be able to manage it. They will also have access to communication tools which will let them communicate with the whole University of Porto Community.

The platform will have an adaptive, responsive and minimalistic design to allow it to work smoothly on multiple devices as well as an intuitive user interface and navigation, that potentiates teamwork and cooperation.


## 1. Actors

The actors for Digi2 are represented in Figure 1 and described in Table 1.

<img src="./images/Actors.svg" alt="Digi2 actors" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 1: Digi2 actors</figcaption>



| Identifier         | Description                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| User               | Generic User that can view the website and browse for Digi2 information, Researchers, Projects and job oportunities.                             |
| Visitor            | Unauthenticated User that can sign-up and sign in.                                                                                               |
| Authenticated User | Authenticated User that can be made a Researcher, also has access to a profile with personal information including current and past projects.    |
| Researcher         | Authenticated User that can access and contribute to the researches they are enrolled in. They can also manage the Inventory.                    |
| Human Resources    | Authenticated User that can allocate Authenticated Users into projects making them Researchers. They can also communicate with the UP Community. |
| Administrator      | Authenticated User that is responsible for the managment of Users and Researches. They can give or revoke Researcher and HR privileges.          |
<figcaption align="center">Table 1: Digi2 Actor Description</figcaption>


## 2. User Stories

For the Digi2 Website Revamp, the considered user stories are presented below.

### 2.1 User

| Identifier | Name                 | Priority | Description                                                                                                                  |
|------------|----------------------|----------|------------------------------------------------------------------------------------------------------------------------------|
| USx        | View Home Page       | High     | As a User, I want to be able to view the Digi2 Home Page so that I can get familiar with the Lab and its areas of expertise. |
| USx        | View Jobs Page       | High     | As a User, I want to be able to view the Jobs Page so that I can view the available jobs and apply for them.                 |
| USx        | View Activities Page | High     | As a User, I want to be able to view the Activities Page so that I can view in which areas of work Digi2 is involved in.     |
| USx        | View EIT Page        | High     | As a User, I want to be able to view the EIT Page so that so that I can know how the Digi2 and EIT work together.            |

<figcaption align="center">Table 2.1: User's user stories</figcaption>

### 2.2 Guest

| Identifier | Name             | Priority | Description                                                                                                                         |
|------------|------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------|
| USx        | Sign-in          | High     | As a Guest, I want to be able to authenticate so that I can have access to the features the platform provides.                      |
| USx        | Sign-up          | High     | As a Guest, I want to create an account so that I can authenticate and have my own profile.                                         |
| USx        | Recover Password | Medium   | As a Guest, I want to be able to recover my password, so that I can access my account in case I have forgotten the password for it. |

<figcaption align="center">Table 2.2: Visitor's user stories</figcaption>

### 2.3 Authenticated User

| Identifier | Name            | Priority | Description                                                                                                                                                       |
|------------|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| USx        | View Profile    | High     | As an Authenticated User, I want to view my user profile so that I can check my project and research history, personal information and have an option to edit it. |
| USx        | Sign Out        | High     | As an Authenticated User, I want to sign out from my account, so that I can end the login session.                                                                |
| USx        | Edit Profile    | High     | As an Authenticated User, I want to be able to edit my profile's information, so that I can update my contacts, preferences and personal information.             |
| USx        | Profile Picture | Medium   | As an Authenticated User, I want to be able to add a picture to my profile, so that others can see who I am when visiting my profile.                             |


<figcaption align="center">Table 2.3: Authenticated User's user stories</figcaption>

### 2.4 Researcher

| Identifier | Name                   | Priority | Description                                                                                                                                               |
|------------|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| USx        | Create Project Page    | High     | As a Researcher, I want to create a Project Page so that I can gather other Researchers, share resources, and outline objectives.                         |
| USx        | Mentor Matching        | Medium   | As a mentor Researcher, I want to match with mentee researchers with specific skills and interests so that I can gather researchers with more efficiency. | 
| USx        | Performance Evaluation | Medium   | As a Researcher, I want to evaluate my mentors/mentees so that I can provide them with feedback and evaluate the mentoring relationships.                 | 

<figcaption align="center">Table 2.4: Researcher's user stories</figcaption>

### 2.5 Administrator

| Identifier | Name                  | Priority | Description                                                                                                                               |
|------------|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|
| USx        | Manage Accounts       | High     | As an Administrator, I want to be able to edit User permissions, so that I can make them Researchers or HR.                               |
| USx        | Manage Administrators | Low      | As an Administrator, I want to be able to accept or decline admin applications so that I can make sure the admins are a restricted group. |

<figcaption align="center">Table 2.5: Administrator's user stories</figcaption>

## 3. Supplementary Requirements

This section contains the business rules, technical requirements, and restrictions of the project.

### 3.1 Business Rules

| Identifier | Name  | Description |
|------------|-------|-------------|
| Lorem      | Ipsum | Dolore      |

<figcaption align="center">Table 3.1: Business rules</figcaption>

### 3.2 Technical Requirements

| Identifer | Name  | Description |
|-----------|-------|-------------|
| Lorem     | Ipsum | Dolore      |
<figcaption align="center">Table 3.2: Technical Requirements</figcaption>

### 3.3 Restrictions

| Identifier | Name  | Description |
|------------|-------|-------------|
| Lorem      | Ipsum | Dolore      |
<figcaption align="center">Table 3.3: Project Restrictions</figcaption>


# A3: Information Architecture

This artifact serves as an overview of the planned information architecture of the system.

## 1. Sitemap

Our system is built around X main areas. [Description of the pages according to a sitemap]


<img src="./images/default.png" alt="Digi2 Sitemap" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 2: Sitemap</figcaption>

## 2. Wireframes/Mockups

Below are presented wireframes for the [all pages / pages of our choosing].
<img src="./images/default.png" alt="Digi2 Wireframe" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 3: X wireframe</figcaption>

<img src="./images/default.png" alt="Digi2 Wireframe X" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 4: X wireframe</figcaption>


<img src="./images/default.png" alt="Digi2 Wireframe X" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 5: X wireframe</figcaption>

# Team
- Carlos Madaleno, up201604906@edu.fe.up.pt
- Diana Martins, up202108815@edu.fe.up.pt
- Ntsay Zacarias, up202008863@edu.fe.up.pt
- Rui Soares, up202103631@edu.fe.up.pt

#### Digi2 Revamp, 16/02/24

visitor research hr admin
