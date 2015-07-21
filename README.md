# tread

[![Build Status](https://travis-ci.org/wraithan/tread.svg)](https://travis-ci.org/wraithan/tread)

`tread` is a test runner. The idea is all of your tests should run in separate processes.

## What is it?

Tread is a binary that takes patterns and folders. It finds files that match the patterns in the directories, then runs them in separate processes, in either serial or parallel. As it runs them it keeps track of results then reports them.

It is not ready for real time yet (like I'm not confident that it will inform you of all your failures or successes in all cases) so it isn't published for installation yet. I hope to have this in use in the node-newrelic module in the near future, but I need to have a complete enough test suite to prove it works.

While there will likely be TAP output, I want to make it relatively easy to write and use your own reporters and not have them be restricted to just text output from the process.

## Versioning

Backwards compatibility is considered for the reporter API, arguments, and file finding.

### Patch
A change without any change to the reporter API, arguments, or what files are found in file finding is a patch release. Exceptions would be major features that do not change the interfaces might be considered a minor version bump.

### Minor
A change to either of those that does not change behavior from the perspective of older code (additional data in reporter, additional arguments, same files found) or new features that do not affect the mentioned interfaces would cause a minor version bump.

### Major
If there is a change the reporter existing reporter data, existing arguments in an ambiguous to parse way, or any change to how files are discovered would cause a major version bump.
