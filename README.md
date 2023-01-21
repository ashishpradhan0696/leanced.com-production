
# Leanced

Leanced is an online informational platform that brings you vital key nutrition facts related to health supplements in an easy interactive way.




## What it does ?
Leanced lets you choose a product and visualize (only) few of the key nutrition facts in it, and decide for yourself which product fits your needs to be your next health supplement.


## Built with

HTML  
CSS  
JavaScript  
ReactJs  
ChartJs  
MUI(formerly material-UI)  
Firebase  
EmailJs





## Features

✓ Filter products by brand             
✓ Visualize key nutrition facts about the health supplement  
✓ Interactive charts allows you to unselect any label/content from the chart and visualize each labels individually by clicking on it  
✓ Toggle the charts and the nutritional information between ***per serving size view*** and ***per 100gm serving view*** for the respective product  
✓ Login using your email or Google authentication  
✓ Add product to watchlist to visualize it later  
✓ Know more about your supplement in the FAQ section  
✓ Suggest a feedback or report an issue from the 'Feedback' section   


## Demo

1. General Overview


https://user-images.githubusercontent.com/105099493/193408485-be7d309f-3be4-4dcc-8611-ca0c67c822aa.mp4

2. Visualizing nutrition facts 

https://user-images.githubusercontent.com/105099493/193408522-fdc856b3-67dd-4c30-a000-bab3d98ece5f.mp4


3. Login and Add supplements to watchlist

https://user-images.githubusercontent.com/105099493/193408507-dd10d6e0-b9cf-43ae-9d5e-a6d7600854a4.mp4



## Optimizations

Few of the optimizations and tests:   (More to be added)

#**ROUTE BASED CODE-SPLITTING**  

>Implemented this enhancement feature as a part of issue #2 [https://github.com/ashishpradhan0696/leanced.com-production/issues/2]  

Using code splitting in React, we can reduce the initial bundle size, app loading time, and enhance its performance.  
>Before:   

<img src="https://img.shields.io/badge/Bunde%20size-1.1MB-red">
<img src="https://img.shields.io/badge/Total%20resouces-7.8MB-red">

![image](https://user-images.githubusercontent.com/105099493/193408995-2b5edc1b-9e9c-4e9b-b73c-a2cc1d604a02.png)


>Lazy loading just a single route:    

<img src="https://img.shields.io/badge/Bunde%20size-988KB-yellowgreen">
<img src="https://img.shields.io/badge/Total%20resouces-7.2MB-yellowgreen">

![image](https://user-images.githubusercontent.com/105099493/193409039-78ca3b0a-f691-42b6-a0a9-8e421f38da6b.png)

>Lazy loading all the required routes: 

<img src="https://img.shields.io/badge/Bunde%20size-441KB-green">
<img src="https://img.shields.io/badge/Total%20resouces-6.7MB-green">

![image](https://user-images.githubusercontent.com/105099493/193409071-0357c928-932c-4181-8f95-d59b2cbb8436.png)



#**PROGRESSIVE ASSET LOADING**

>This was implemented as a part of issue #3 [https://github.com/ashishpradhan0696/leanced.com-production/issues/3]  

Since the home page uses a high resolution image as its background, sometimes when the page is opened , the image is still loading. This impacts the user experience and it worsens when we have a very slow internet connection. Implemented this to provide the user a glimpse of the image coming up gradually until it loads completely.

>Before  



https://user-images.githubusercontent.com/105099493/193409986-c8e4547a-efac-4901-9ec5-2a169cc2d075.mp4

>After



https://user-images.githubusercontent.com/105099493/193409995-b2274940-8d8a-4b7f-b832-998b0e5eb5be.mp4


## What lies ahead ?
 
 ✓ <img src="https://img.shields.io/badge/issues-3%20closed-green"> 

- Closing the open backlog items   
<img src="https://img.shields.io/badge/issues-3%20open-orange">

- Improvement in the current UI
- Using Redux for state management
- Adding additional health supplements categories to the current list



## Feedback

If you have any feedback, please reach out to me at ashish.pradhan0696@gmail.com


## License

All rights reserved.   
Read more at https://choosealicense.com/no-permission/




