# whack-ding

## Inspiration
A lot of us struggle with cooking nowadays. Since quarantine started, many people have started to cook on their own. But not all of us are that good at it. Besides, who wants to stand by a pot of water waiting for it to boil? Have you ever abandoned your stovetop momentarily only to find a disaster waiting for you when you return? Don't worry - we've been there. And by _there_ we mean the not-so-pleasant aroma of burnt eggs that too often hangs among us.

## What it does
Ding watches your stovetop and notifies you via SMS text notification when your food is close to done, preventing overcooking or overboiling.

## How we built it
We used a TCL 10L to run a webcam application hosted using Google Cloud Firebase, which invokes a Google Cloud Function that analyzes the feed sent by the TCL 10L. This Google Cloud Function utilizes the Google Cloud Vision API to perform label detection on the contents of the video frame. The function goes on to assert the activity that is taking place on the stovetop and its status. For example, it recognizes that an egg is being fried in the pan on the stovetop and checks whether or not the egg is thoroughly fried yet. When the status is right, the Google Cloud Function uses the Google Cloud Platform Mail API to send an SMS text message to the users that their food is ready.

Domain: kitchenhelp.online

## Challenges we ran into
On the hardware side, our initial webcam was not functional, so we had to find an alternative (the TCL 10L). Then, the problem of securing it came about, and we had to resort to duct tape - but we didn't have any, prompting Sohil's 6-mile jog to purchase some. He even wore his mask while jogging (Wear Your Mask!!). The structural integrity of Ding was also inconsistent, especially due to condensation from boiling water on our adhesive surfaces. This resulted in a few mini heart attacks when Ding came loose and nearly suffered a deadly plummet into the pot of scalding water below it. With more time and a higher budget, we would have liked to set up a far more secure apparatus.

We were also able to resolve some problems with vision and label detection using hardware. Initially, we struggled with image clarity, particularly due to the steam produced by boiling water that fogged up the lens. To combat this, we introduced additional lights and a fan into the setup, which worked nicely to sharpen the video feed. We also reconfigured the camera selection remotely via the web-hosted webcam script in order to capture higher quality data.

On the topic of hosting, which was done through Google Cloud Firebase, we had a number of issues when trying to deploy our Cloud Functions and the webcam script. This was largely due to most of our resources and dependencies being configured locally outside of the Firebase subproject, so we simply had to identify, locate, and re-package these resources into the Firebase subproject.

Amidst this fix, we also remedied our very disorganized start with Firebase, wherein we had separate hosting services for the Cloud Functions and the web process, despite them being part of the same project. Combining them onto one hosting platform streamlined both the system communication between these scripts and our further testing and deployment.

However, in the process of the previous fix, we relocated our service account key for Google Cloud Vision from a location specified in the .gitignore to a location in the Firebase project (without adding it to the .gitignore this time). This resulted in our token being temporarily exposed and us receiving a warning from Google. Luckily, we were able to swap out the key with a new one and secure this one properly, avoiding any public malicious use of our access.  

## Accomplishments that we're proud of
Neither of us had ever used Google Cloud Platform in the past, so there was a huge learning curve involved in this project, but we feel like we learned a lot about all the useful applications of these many and versatile cloud services. What we're most proud of though is that Ding alerted us at the perfect time to get some yummy fried eggs (and they were _delicious_).

## What we learned
Considering we started with no knowledge about Google Cloud Platform, we learned tons of powerful GCP features and how to use them from Cloud Functions to Firebase Hosting and the Vision and Mail APIs in between. 

## Special Shoutouts to...
Raghu Radhakrishnan, Nitin Ramadoss, Girish Hari, Ayo Adesunloye, Aditya Nair, Edison Xie, Satvik Borra, and Christian Michaelis for providing us with some virtual company and keeping us awake and lively!

## What's next for Ding!
We want Ding to be a more secure and well-packaged hardware appliance. Though this was a good proof of concept from a hardware perspective, we would really like to set this up on a marketable hardware product. Additionally, rather than receiving SMS text messages when food is ready, we want to make a mobile application that sends a push notification. This application would also allow the user to remotely view the video feed and check the stove themselves if they choose to. 
