# Dev team git workflow

## Connect to the organization's respository

```
git clone https://github.com/4billy/betrothed.git <optional-name-for-local-repo>
cd [ betrothed || <optional-name-for-local-repo> ]
```

#### Confirm that you have a remote connection called `origin`

```
git remote -v
```

## Work on a feature

#### Rebase to latest `main` branch

```
git checkout main
git pull --rebase origin main
```

#### Start work on a feature branch

```
git checkout [-b] <feature-branch-name>
```

- Include `-b` flag to create and checkout a new branch
- Exclude `-b` to checkout an existing branch

#### Write code, commit, repeat

- Small, frequent commits
- Descriptive commit messages, written in the present tense

```
git add .
git commit -m <commit-message>
```

#### Rebase before pull request

```
git pull --rebase origin main
```

#### Resolve any merge conflicts

- Be sure to resolve merge conflicts in this step, **before** making a pull request
- For **each commit** that creates a merge conflict, resolve the conflict in VSCode, save the changed file(s), then:

```
git add .
git rebase --continue
```

- Keep the existing commit message that will appear in Vim and write-quit from Vim

```
:wq
```

#### Push to a feature branch on the organization's respository

```
git push origin <feature-branch-name>
```

## Make a pull request on GitHub

#### If pull request is _rejected_: fix bugs, commit, rebase, push

```
git add .
git commit
git pull --rebase origin main
git push origin <feature-branch-name>
```

#### If pull request is _accepted_: checkout `main`, rebase `main`, delete feature branch

```
git checkout main
git pull --rebase origin main
git branch -d <feature-branch-name>
```

## Setting an upstream branch

To avoid specifying `origin <feature-branch-name>` every time you make a `push` from a given feature branch, you can set a branch on the remote repository as the `upstream` for a local branch using the `-u` flag.

#### First time pushing from local `feature-1` to `origin/feature-1`

```
git push -u origin feature-1
```

#### Subsequent pushing from local `feature-1` to `origin/feature-1`

```
git push
```
