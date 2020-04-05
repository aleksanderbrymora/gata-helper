# TA Helper

## Intro

Create a cli that takes care of the boring stuff TA does.

## Functionality

### Class repo

Initial set up gathers info needed to generate all the structure of the files in the class repo.
It sets up structure of a class folder once, based on initially gathered information from the sign up.
After that structure gets generated it then grabs the info of the github and uploads the structure there.

### Warmups

A bank of warmups is already prepared (because it is).
When typing in a command it then grabs next warmup, pushes it to github and displays a link to it.
The solutions to the warmup have to be submitted by hand though because they (at least in principle) are all different.

### Project feedback

Generate feedback files structure

- Gather info about the projects
- Generate folders with feedback file and the project file
- Create a gist for the feedback
- Create a csv file with the info for inputting in the Google Sheets tracker

## Later

### Maintaining

There is a Github action set up to merge pull requests automatically if there are no issues in the provided readme.
If there are issues, it optionally sends a message to TA with the info.

If someone hasn't submitted homework for more than 10 days it sends a message to them from that point on, to remind them to do it.

### Newsletter

Generate event fields for the newsletter, based on the info from Google Calendar.

### Calendar

Based on the events in the GA's Calendar there are reminders set up.

When someone has Birthday then remind the TA on Slack to get a cake or something.

When there is any other event then remind everyone with Slack Bot.

### Gitbook

Commit initial structure to the Gitbook, but not make it public yet - leave that to TA.
The structure is pretty much all the same, so it can be initially populated by program, then can be finalized by TA.
