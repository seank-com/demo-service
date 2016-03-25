# demo-service

A cadre of services for demonstration purposes

## Where is all the code?

All the code for these services exists in separate branches. Normally you would structure your repo to have a release branch and a development branch or maybe use new branches for feature development before issuing a PR to merge them into master. In this repo however we will deposit a number of different services each on a different branch. This will allow you to easily compare different server implementations by diffing branches.

### Git Fu

An interesting way to compare branches is to fake merge two branches together like so.
```
git checkout branchA
git merge --no-commit --no-ff branchB
```
Now you can use tools like ```git gui``` to inspect the merge changes. When you are finished, just abort the merge as follows.
```
git merge --abort
```
