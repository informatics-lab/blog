---
title: Facebook Chatbot
layout: project-overview
author: Tom Powell
summary: Developing and deploying a public-facing weather chatbot on Facebook.
completed: false
project: facebook-chatbot
thumbnail: https://images.informaticslab.co.uk/misc/c83ef0a3d730d4358039a63ca35583ed.png
header: https://images.informaticslab.co.uk/misc/3ce648336a410b9ba320cb0ce055a766.png
---

## Developing a 'conversational' Facebook Chatbot
Following the successful work done with Microsoft developing the 
[weather and climate bot](http://www.informaticslab.co.uk/projects/weather-and-climate-bot.html) the Informatics Lab have 
been busy creating a more user-friendly, public-facing bot, due appear on Facebook Messenger as a prototype in the very near future.  

Using virtually the same tool set ([Microsoft Bot Framework](https://dev.botframework.com/) and [LUIS](https://www.luis.ai/)) 
significant time and effort has been spent working on features that will hopefully make our bot respond 
similar to how a person might, we hope this will provide a more conventional messenger experience than some existing 
similar bots currently provide.

Here's some of the stuff we've been working on:

<b>Interchangeable persona with multiple responses per intent:</b> 
Most bots already provide a means of replying to the same question in multiple ways. Our bot definitely has this too, 
however what's new is all our responses are read from a single JSON file. This gives us the 
flexibility to completely alter all the bot's responses (style and tone of how it responds) with a single update.

<b>Expiry of contextual, conversational information:</b>  
Say a user asks for a forecast in a given location. The bot will remember we are talking about that location for a 
period of time, allowing the user to ask follow up questions more intuitively; "Will it be cold in Exeter today?", 
"Will I need a coat?"

<b>Repeat intents:</b>  
This allows for users to ask the same thing multiple times, potentially just adjusting the question slightly;  
"Will I need a coat today?", "How about tomorrow?"  

<b>Variable certainty responses:</b>
Say a user asks "Will I need a coat tomorrow in Brighton?" our bot knows a user might need a coat if the 
temperature is low, but also if it's likely to rain. The bot can use lists of weather variables 
to score questions against some given rules. Scores are then combined in various ways to calculate a score for how sure we are 
that a user should take action. The variation of certainty can be conveyed to the user via matching 
appropriately scored responses.

<b>Multimedia responses:</b>
The bot can respond with various images (including animated gifs) and videos along with varying textual information. We have also 
implemented the Facebook Messenger UI buttons to aid some basic usage.   

<b>String templating with [dot.js](http://olado.github.io/doT/index.html):</b>
We have enabled dynamic content, by inserting string templates then applying a data model to it. 
This allows us to inject data and evaluate conditional statements at runtime further modifying our responses.

<b>Deployment, logging and analytics:</b>
Our app is a single [node.js](https://nodejs.org/en/) server running on an Amazon [EC2](https://aws.amazon.com/ec2/) 
instance, inside a [docker](https://www.docker.com/) container. All of this is managed using [Terraform](https://www.terraform.io/). 
Conversations are tracked on several analytics platforms, including [Google Analytics](https://analytics.google.com/). 
This enables us to see exactly what the most frequent questions are. The data collected here can inform the development 
of new features, prioritising those that users really want. We are using a neat library called 
[sentry](https://sentry.io/for/javascript/) to track any errors, this is set up to email us if something goes wrong. 
All logs are piped into Amazon's [Cloudwatch](https://aws.amazon.com/cloudwatch/).

Other features we would still ideally like to develop or explore include; push notification alerts. Varied personas, each 
targeting a specific user demographic, and expanding on some of the basic functionality we have already implemented.  

As with all Informatics Lab prototypes, this project is simply a 'proof of concept' at the moment.
We hope that via a combination of the analytics data generated plus data collected through user surveys, we can gather 
enough evidence and requirements to inform a proposal for an official Met Office Chatbot.

Try out our prototype by clicking the button below...

<script>      
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '469466473385281',
          xfbml      : true,
          version    : 'v2.6'
        });
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));      
</script>

<div class="fb-messengermessageus" 
    messenger_app_id="469466473385281" 
    page_id="1469618859787954" 
    color="blue"
    size="large">
</div>
