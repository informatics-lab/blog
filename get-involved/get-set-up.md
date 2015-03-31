---
layout: page
---

Setting up you computer
=======================

Follow these instructions to set up your computer for working in the Lab. It's primarily written for people who have just received new laptops at the Met Office, but if you'd like to play along at home then adjust the instructions as you see fit!

1. Turn on you computer and log in with the default admin account.
1. Create a new account, making sure that you give it admin privileges.
1. Let the hard drive encrypt: this will happen automatically when the laptop gets connected to power, and will take around 30 mins.
	* Don't interrupt this by shutting down or turning off the power
	* You can check the progress by opening `System Preferences > Security and Privacy > Filevault`
1. Reboot and login as own user.
1. Open a terminal and run `git`. This will prompt you to install the XCode command line tools.
1.

        sudo mkdir -p /opt/boxen/repo
        sudo chown -R ${USER}:staff /opt
1. Clone the Lab Boxen repository

        git clone https://github.com/met-office-lab/our-boxen/ /opt/boxen/repo
1. Run Boxen to install all manner of goodies

        /opt/boxen/repo/script/boxen
   This will take up to an hour so hold tight

Following this other things to install/set up:

###Slack

1. install from the appstore native application
1. join the group `met-office-lab`

###Calendars

1. enable the calendars feature within your google profile
1. ask Niall for an invite to the calendar

###Git

Set up your Git credentials by doing

    git config --global user.name "<your name>"
    git config --global user.email "<your email>"