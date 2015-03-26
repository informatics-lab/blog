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
1. Add your account to the decryption users list in `System Preferences > Security and Privacy > Filevault`
1. Reboot and login as own user.
1. Open a terminal and run `git`. This will prompt you to install the XCode command line tools.
1.

        sudo mkdir -p /opt/boxen
        sudo chown ${USER}:staff/opt/boxen
1. Clone the Lab Boxen repository into
    
        /opt/boxen/repo
        git clone git@github.com:met-office-lab/our-boxen.git /opt/boxen/repo
1. Navigate to the Boxen directory and run Boxen to install all manner of goodies

        cd /opt/boxen/repo
        ./script/boxen
   This will take up to an hour so hold tight 