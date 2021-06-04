# CS35L-Website
## Introduction
<b>Our Game-Website App is an integrated platform for gamers:</b>

Thanks to quarantine a lot of people have been spending a lot of time inside, 
and a portion of those people have turned to video games for entertainment. 
The goal of this project is to connect people who have found similar interests in gaming, 
notify them of news, and create friendships that can reach across borders 

<b>Our app allows you to:</b>
- Signup/Login to access more features on our website
- Edit profile to reflect your own gaming preferences
- Add friends of similar interests
- Make a posts about your favourite games (or whatever you want)
- Search posts or users that are relevant 
- Browse games from different platforms
- Read trending news of popular games

<i>Note: Before login, the Profile and Forum tab of the Navbar are hidden.
You need to login before you can use these features.</i>

## Installation
To run this project, follow these instructions:\
First install newest version of [Node.js](https://nodejs.org/en/)\
Go to game-website folder
```bash
cd game-website
```
Then go to backend directory and run the following commands:
```bash
cd backend
npm install
npm start
```
Then from game-website, change to frontend directory and run the following commands:
```bash
cd frontend
npm install
npm start
```
Before browsing games, please request a temporary access to the proxy\
https://cors-anywhere.herokuapp.com/corsdemo
## How to Use
### Home page
This is the starting point of our app: 
On the Home page, you can navigate to other page through the top Navbar
You can also do a search for the registered users and posts. 
The search result will be displayed as columns of posts cards or users' name cards.
### Browse Games page
After you have access to the proxy
Then you can select a platfrom and a sub-list of the
games available on that platform will be fetched and 
displayed on the website
### News page
News page display news related to gamers and technologies, click on any of the links 
to visit the actual news page.
### Login/Signup page
To see the Forum and Profile page, make an account by clicking the create account link
under the login bar. Then login with your credentials. You should now be able to 
use the Forum page and create a profile. 
### Forum page
This page displays the posts that registered users made.
In this page, you can make a post via submission form on the right. 
(The attachment picture is optional, but other fields are required)
You can also like and delete other user's post as you wish.
There is no restriction on that because we believe our App serves the user, and
our users have the freedom to decide what they want to see.
### Profile page
This is the page where you can view and edit your profile. You can edit your profile picture,
you can add your favorite games, you can add a short bio, and you can add friends by email as well. 
## References & Special Thanks
- The design and implementation of NavBar was inspired from [this tutorial](https://youtu.be/fL8cFqhTHwA)
- The visual layout of forum page was inspired by [this tutorial](https://youtu.be/ngc9gnGgUdA)
- The backend requests implementations were partially inspired by [this tutorial](https://youtu.be/WDrU305J1yw)
- Some of the background color gradient was created using [this website](https://cssgradient.io/)
- The Homepage background was a screenshot at 2:27 of [this video](https://www.bilibili.com/video/BV1Ap4y1b7UC) from Arknights
- The search bar icon was downloaded from [this link](https://commons.wikimedia.org/wiki/File:Vector_search_icon.png#/media/File:Vector_search_icon.svg)
- The like button design was downloaded from the website: [flaticon](https://www.flaticon.com/free-icon/like_633759)
- The delete button design was downloaded from the website: [svgrepo](https://www.svgrepo.com/svg/79440/delete-button)
- The user login and registration design is derived from [this](https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0) and [this](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications) tutorial
