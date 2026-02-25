# Pages - 

## Public Pages - 
1. Public feed 
2. Trending Page
3. Login / Register Page

## Private Pages 
1. Personal Info Page
2. Create Post Page
3. Draft Posts Page

// workflow - 
a typical blog site have blogs 
which any person can read 

similar i want 
any person can come & read blogs on our website 
// only authenticated & authorized will be able to 
post & draft new blogs 
& comment on any blog. 

flow i can think of - 
for authenticated (Private)
there will be page - login & register for user creation 
on user dashboard 
he can view his posted posts
draft posts 
also on user account option we will give profile option (not so important right now)
pages i can think of - 
/login
/register
/dashboard
/editPost/:id
/createPost
/editProfile/:id or can be settings 


for non authenticated + authenticated (Public) 
people can come to website 
land on public homepage 
where popular & latest post will be displayed 
popular people 
and a search option to search 
read articles after searching 

/ (homepage) (trending page)
/profile/:id (user pofile listing user posted blogs)
/post/:id (to read a blog)



public pages (random user) check list 🟢
-homePage (list recent posts) 🟢
    -Pagiation task 🟢
    -Post Read 🟢
    -Top categories sidebar 🟢 (just came to know that we can sort on backend using postcount as postcount is not a field we are calculating it)
    -Categories list 🟢
    -Categories wise list posts 🟢
    -user wise post list (get post by author); 🟢
-login ✅
-register 🔴
-about 🟢



