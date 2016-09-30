#Developer Guide For Blueprint's Lava Mae app!
## Setup
* [Web app Setup][/docs/setup.md]

## Style Guide
Our Rails style guide can be found [here][https://github.com/calblueprint/style-guides/tree/master/rails].

## Commit Process
IMPORTANT: Make sure to set your git information. Instructions can be found [here](https://help.github.com/articles/setting-your-username-in-git/).

Developer workflow is as follows:
1. Make sure your master branch is up-to-date:
```
git checkout master
git pull
```
2. Checkout a new branch off of master. Name the branch in the following manner:
```
git checkout -b <your_name>/<your_feature>
```
3. Create a GitHub issue for your feature in the Lava Mae repository so that other
engineers know what you are working on.
4. Implement your new feature.
5. Create a pull request. Make sure to edit the pull request title to align with
your feature. In the description, you should generally write a small 1-2 line description
of what you completed. Then, on separate new lines, indicate which issues you closed with
this pull request with the following syntax:
```
Fix #104
Fix #105
```
6. Push your code: `git push origin <your_branch_name>`. Submit your pull request and
another engineer will review your code and discuss with you the changes you made if necessary.
7. Before merging your branch, make sure that your branch is up-to-date with head. You can do
this by choosing option `rebase and merge` when merging pull request on GitHub. When merging
in a pull request, the issues indicated in the description are automatically closed. If you are
the one merging in the pull request, make sure to delete the branch! (you can do this on the pull
request itself).
8. Rinse and repeat! Thank you for contributing to Lava Mae!
