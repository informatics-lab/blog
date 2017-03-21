---
title: Labby the Slack Bot
layout: project-overview
author: Jacob Tomlinson
summary: We got bored doing tech odd-jobs, so we made a chat-bot called Labby instead
completed: true
thumbnail: https://images.informaticslab.co.uk/profiles/cropped/labby-the-rat.jpg
project: labby
---

We make extensive use of [Slack](https://slack.com/) instant messenger in the Lab. We've made it even more useful by adding our very own [Slackbot](https://api.slack.com/bot-users) called Labby. Labby is built using an open source chatbot framework called [opsdroid](https://opsdroid.github.io/) which allows you to write "skills" for your bot in Python.

{% youtube mFYB2qQJLpU %}

Labby's skills range from highly functional, to highly amusing. Here is an (ever growing) list of Labby's best tricks, which we access by talking to her:

1. Monitor our Amazon Web Services (AWS) instances
1. Temporarily grant us enhanced privileged AWS credentials to allow us to start new instances
1. Alerting on webhooks from Grafana, GitHub, Travis CI and more
1. Regularly ask us what we've been working on and keep a record of our answers for the time sheet
1. Most important of all, she brightens up our work days by greeting you in the morning, and inserting relevant pop-culture references into our instant message conversations.

