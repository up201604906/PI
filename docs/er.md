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

<img src="./images/er/Actors.svg" alt="Digi2 actors" style="display: block; margin: 0 auto">
<figcaption align="center">Figure 1: Digi2 actors</figcaption>


| Identifier    | Description                                                                                                                                                                                                           |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User          | Generic User that can view the website and browse for Digi2 information, Researchers, Projects, and job opportunities.                                                                                                |
| Visitor       | Unauthenticated User that can sign up and sign in.                                                                                                                                                                    |
| Students      | Authenticated Users that can access and contribute to the research they are enrolled in, managing inventory and wishlist. Also has access to a profile with personal information including current and past projects. |
| Collaborators | Students that can also communicate with the UP Community.                                                                                                                                                             |
| Administrator | Collaborators that are responsible for the management of Students and Collaborators.                                                                                                                                  |
<figcaption align="center">Table 1: Digi2 Actor Description</figcaption>


## 2. User Stories

For the Digi2 Website Revamp, the considered user stories are presented below.

### 2.1 Collaborator Management

| Identifier | Name                         | Priority | Description                                                                                                                                                                          |
|------------|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US101      | User Profile                 | High     | As an Authenticated User, I want to view my user profile so that I can check my project and research history, personal information and have an option to edit it.                    |
| US102      | Create Profile               | High     | As a Unauthenticated User, I want to be able to make a description of my interests and work areas when I create my profile, so that I can be easily assigned to projects or mentors. |
| US103      | Match Making with Projects   | High     | As an Authenticated User, I want to easily access projects that would be relevant given my expertise, based on my selected profile tags.                                             |
| US104      | Collaboration Projects       | High     | As an Authenticated User, I want to be able to easily access my teammates' list and see the projects that they are working on, so that I can help them if possible.                  |
| US105      | Mentoring Match              | Medium   | As a Collaborator, I want to see a page with possible mentorees that match my areas of expertise, so that I can help student researchers.                                            |
| US106      | Mentoring Assign             | Medium   | As a Student, I want to be assigned a mentor, so that I can get help getting acquainted with the work.                                                                               |
| US107      | Performance Evaluation Tools | Low      | As an Administrator, I want to be able to create a performance evaluation form for researchers to fill, so that I can access their records and see a ranking of the best workers.    |
| US108      | Check Performance Feedback   | Low      | As a Student/Collaborator, I want to see my performance feedback, so that I can be motivated to work harder.                                                                         |
<figcaption align="center">Table 2.1: User's user stories</figcaption>

### 2.2 Publication Management

| Identifier | Name            | Priority | Description                                                                                                                               |
|------------|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|
| US201      | Create Event    | Medium   | As an Authenticated User, I want to be able to add a date to a future conference or event, so that my colleagues can see it.              |
| US202      | See Event List  | Medium   | As a Guest, I want to see an event list, so that I can feel more acquainted with the work done and to be done.                            |
| US203      | Event Attendees | Medium   | As an Authenticated User, I want to check myself into a conference or event, so that my colleagues can know who’s attending.              |
| US204      | Google Calendar | Low      | As an Authenticated User, I want to check Google Calendar for future events or meetings, so that I can keep myself updated and organized. |

<figcaption align="center">Table 2.2: Visitor's user stories</figcaption>

### 2.3 Project Tracking

| Identifier | Name                              | Priority | Description                                                                                                                                                                               |
|------------|-----------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US301      | Project Creation                  | High     | As an Authenticated User, I want to be able to add my projects to the website, so that others can see and join them.                                                                      |
| US302      | Publications List                 | High     | As a User, I want to be able to see a list of all the published works, so that I can easily search for a project that interests me.                                                       |
| US303      | Help Others Write Articles        | Medium   | As a Collaborator, I want to add an alert to my article telling my colleagues if I need some help writing it, so that we can work together and make writing more efficient.               |
| US304      | Change Article Status             | Low      | As a Collaborator, I want to be able to change the status of the articles that I’m writing (“In Writing”, “In Revision”, “Being Presented”, “Published”) so that others are informed.     |
| US305      | Resource Request and Allocation   | Low      | As a Student, I want to request and allocate lab resources (equipment, software, etc.) to my project, so that team members have everything they need to execute their tasks efficiently.  |


<figcaption align="center">Table 2.3: Authenticated User's user stories</figcaption>

### 2.4 External Communication

| Identifier | Name                 | Priority | Description                                                                                                                     |
|------------|----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------|
| US401      | Instagram Connection | High     | As a User, I want to see the Digi2 Instagram posts directly on the website, so that I can easily understand the company’s work. |
| US402      | User Support         | High     | As a User, I want to be able to directly talk to someone from the team, so that I can clarify any doubts that come up.          |
| US403      | View EIT Page        | Medium   | As a User, I want to be able to view the EIT Page, so that I can know how the Digi2 and EIT work together.                      | 
| US404      | Open Positions List  | Medium   | As a User, I want to be able to see the open positions list, so that I can look for something that interests me.                |
| US405      | Add Position         | Medium   | As an Admin, I want to add a new position to an open position list, so that I can get candidates for it.                        |
<figcaption align="center">Table 2.4: Researcher's user stories</figcaption>

### 2.5 Resource Management

| Identifier | Name                                    | Priority | Description                                                                                                                                       |
|------------|-----------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| US501      | View Allocation List                    | High     | As a Collaborator, I want to be able to consult the materials and their status so that I can request them.                                        |
| US502      | Update Allocation List                  | High     | As a Collaborator, I want to be able to update and add materials to the allocation list so that others are informed.                              | 
| US503      | View Material Wishlist List             | High     | As a Collaborator, I want to be able to consult a wishlist so that I can know what needs to be acquired.                                          |
| US504      | Update Material Wishlist                | High     | As a Collaborator, I want to be able to update and add materials to the wishlist.                                                                 |
| US505      | Computational Resources Allocation List | Medium   | As a Collaborator, I want to be able to assign researchers to computers, so that I can keep track of stations being used.                         |
| US506      | Licenses and Passwords List             | Medium   | As a Collaborator, I want to be able to maintain a list with all the available licenses and corresponding passwords, so that others are informed. |
<figcaption align="center">Table 2.5: Administrator's user stories</figcaption>

### 2.6 Other
| Identifier | Name             | Priority | Description                                                                                                                           |
|------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| US601      | View Home Page   | High     | As a User, I want to be able to view the Digi2 Home Page so that I can get familiar with the Lab and its areas of expertise.          |
| US602      | Sign In          | High     | As a Guest, I want to be able to authenticate so that I can have access to the features the platform provides.                        |
| US603      | Sign Out         | High     | As a Student,  I want to sign out from my account, so that I can end the login session.                                               |
| US604      | Manage Accounts  | High     | As an Administrator, I want to be able to edit user permissions, so that every user has the correct Permissions.                      |
| US605      | View Accounts    | High     | As an Administrator, I want to view a list of all the users, so that I can manage accounts.                                           |
| US606      | Profile Picture  | Medium   | As an Authenticated User, I want to be able to add a picture to my profile, so that others can see who I am when visiting my profile. |
| US607      | Recover Password | Low      | As a User, I want to be able to recover my password, so that I can access my account in case I have forgotten the password for it.    |
| US608      | Vacancies List   | Low      | As a User, I want to be able to view the vacancies, so that I can see open positions.                                                 |


## 3. Supplementary Requirements

This section contains the business rules, technical requirements, and restrictions of the project.

### 3.1 Business Rules

A business rule provides explicit guidance or restrictions for actions, decisions, and processes in an organization, aiming to establish uniformity, compliance, and efficiency.

| Identifier | Name                  | Description                                                                                                             |
|------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| BR101     | Deleted User          | When a user account is deleted, its associated content is kept, however, this user no longer has access to his account. |
| BR102     | Inventory Stock Check | Inventory stock can never be a negative value.                                                                          |

<figcaption align="center">Table 3.1: Business rules</figcaption>

### 3.2 Technical Requirements

A technical requirement sets the necessary features and conditions a system or software must have. It guides the development and evaluation of the product's performance, security, and functionality.

| Identifer | Name              | Description                                                                                                                                                                                          |
|-----------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TR101     | Security          | Implementing security measures such as an authentication and verification system is essential to safeguard data and protect the website against potential threats.                                   |
| TR102     | User Support      | Online user support to answer questions and resolve issues.                                                                                                                                          |
| TR103     | Database          | A reliable database system is essential for storing project information, inventory, user information, and more.                                                                                      |
| TR104     | Responsive Design | The website must be responsive, that is, adapt to different screen sizes, such as mobile devices and desktops.                                                                                       |
| TR105     | Robustness        | The system must be prepared to handle and continue operating when runtime errors occur.                                                                                                              |
| TR106     | Accessibility     | The website should be accessible to all users, regardless of abilities or web browsers, promoting inclusivity and broad reach.                                                                       |
| TR107     | Usability         | The user interface should be simple and intuitive, making the system easy to use for all age groups and technical proficiency levels, emphasizing outstanding usability.                             |
| TR108     | Performance       | Optimizing system performance to achieve response times of less than 2s, maintaining user engagement and satisfaction.                                                                               |
| TR109     | Web application   | Developing the system as a web application using standard web technologies (HTML, JavaScript, CSS, and PHP). This ensures universal accessibility without requiring specific software installations. |
| TR110     | Scalability       | The system should be designed to handle a potential increase in the number of users and their interactions, ensuring smooth performance during growth.                                               |
<figcaption align="center">Table 3.2: Technical Requirements</figcaption>

### 3.3 Restrictions

| Identifier | Name                      | Description                                                                                                                                      |
|------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| R101       | Deadline                  | The website must be fully functional and ready for evaluation by the end of March, ensuring timely completion for assessment purposes.           |
| R102       | Original Group Authorship | All work done must be original and a collaborative effort involving all group members.                                                           |
| R103       | Data Privacy              | The website must comply with relevant data privacy regulations and ensure the security and confidentiality of user information and transactions. |
<figcaption align="center">Table 3.3: Project Restrictions</figcaption>


# A3: Information Architecture

This section presents an overview of the information architecture of Digi2. It offers a preview of the website's user interface and demonstrates in a quick and simple manner how the system will be organized.

It comprises three components:
- A sitemap outlining the organization of information across pages;
- Mockups showcasing the user interface:
  - Homepage
  - Jobs page
  - Projects Page
  - Team Page
  - Sign-up Page
  - Sign-In Page
  - Contact Us Page
- Wireframes delineating the functionality and content for:
  - Profile Page
  - Project Page
  - Inventory Page

## 1. Sitemap

Digi2’s website is organized into four main areas:
1. “Social Pages” to check Digi2 activity in the social media and UPorto communication;
2. “Project Pages” for project tracking and management;
3. “Authenticated User Pages” that showcase the user profile;
4. “Inventory Management Pages” lead to item management.



<img src="./images/er/Sitemap.svg" alt="Digi2 Sitemap" style="display: block; margin: 0 auto">
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
