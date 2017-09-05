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
Following on from the successful work done with Microsoft developing the 
[weather and climate bot](http://www.informaticslab.co.uk/projects/weather-and-climate-bot.html) the Informatics Lab have 
been busy creating a more user-friendly, public-facing bot, due appear on Facebook Messenger as a prototype in the very near future.  

Using virtually the same tool set ([Microsoft Bot Framework](https://dev.botframework.com/) and [LUIS](https://www.luis.ai/)) 
significant time and effort has been spent implementing features that will hopefully serve to make our bot respond 
in a reasonably natural manner, hopefully providing a more conversational style than other existing similar bots.

<b>Interchangeable persona with multiple responses per intent:</b> 
Most bots already provide a means of varying responses to the same intent (similar questions). Developers provide a list of 
suitable responses which when triggered one will be chosen at random and returned to the user. Our bot has this. 
However, our bot has been designed in a way that responses are all read from a single JSON file. This gives us the 
ability to completely alter all of the bots responses (style and tone of how it responds) with a single update.

<b>Expiry of contextual, conversational information:</b>  
Say a user asks for a forecast in a given location. The bot will remember we are talking about that location for a 
period of time, allowing the user to ask follow up questions more intuitively after which the bot forgets this 
information; "Will it be cold in Exeter today?", "Will I need a coat?"

<b>Repeat intents:</b>  
Similar to the above, aiming to provide a more natural and intuitive conversational style. This allows for users to 
execute the same intent multiple times, potentially adjusting a variable; "Will I need a coat today?", 
"How about tomorrow?"  

<b>Variable certainty responses:</b>
Say a user asks "Will I need a coat tomorrow in Brighton?" our bot knows that a user could need a coat if the 
temperature is low, but also if its likely to rain. The bot can be configured to read in a list of forecast parameters,
then score each against some given rules. The scores are then combined to provide an overall score for how sure we are 
that a user should take action. This variation of certainty can then be conveyed to the user via the matching 
appropriate responses for the given intent and score.

<b>Multimedia responses:</b>
Images including animated gifs and videos can be returned along with varying textual information. We have also 
implemented the Facebook Messenger UI buttons to aid some basic usage.   

<b>String templating with [dot.js](http://olado.github.io/doT/index.html):</b>
Within our responses we have enabled dynamic content, inserting string templates then applying a data model to it. 
This allows us to inject data and evaluate conditional statements at runtime further modifying our responses.

<b>Deployment, logging and analytics:</b>
Our app is essentially a single [node.js](https://nodejs.org/en/) server running on an Amazon [EC2](https://aws.amazon.com/ec2/) 
instance, inside a [docker](https://www.docker.com/) container. All of this is managed via [Terraform](https://www.terraform.io/). 
Conversations are tracked via several analytics platforms, including [Google Analytics](https://analytics.google.com/) 
enabling us to see exactly what the most frequent utterances and intents are. This data can inform the development 
of new features, prioritising those that users really want. We are using this neat library called 
[sentry](https://sentry.io/for/javascript/) to track any errors, which is set up to email us if something goes wrong. 
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
