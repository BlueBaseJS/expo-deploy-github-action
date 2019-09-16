# expo-deploy-github-action

This action is used to deploy BlueBase projects using expo cli.

## Inputs

### `command`

**Required** The command to execute on expo cli. Default `"publish"`.

There are 3 commans supported:

#### `publish`

Publishes expo client bundle to expo cloud. Uses GitHub API to set is as a deployment. Set release-channels based on branch:

| Branch  | Release Channel |
| ------- | --------------- |
| master  | production      |
| staging | staging         |
| (other) | (branch name)   |

#### `build:ios` & `build:android`

Compiles and builds app files, and uploads them to GitHub releases as assets.

## Outputs

### `appUrl`

The url of the app file. Set if the command is `build:android` or `build:ios`.

### `bundleUrl`

The url of the client bundle. Set if the command is `build:android`, `build:ios` or `publish`.

## Example usage

### Publish App on Expo

```yml
- name: Expo Deploy
  uses: BlueBaseJS/expo-deploy-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    EXPO_CLI_USERNAME: ${{ secrets.EXPO_CLI_USERNAME }}
    EXPO_CLI_PASSWORD: ${{ secrets.EXPO_CLI_PASSWORD }}
```

### Build Android App

```yml
- name: Expo Deploy
  uses: BlueBaseJS/expo-deploy-github-action@master
  with:
    command: build:android
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    EXPO_CLI_USERNAME: ${{ secrets.EXPO_CLI_USERNAME }}
    EXPO_CLI_PASSWORD: ${{ secrets.EXPO_CLI_PASSWORD }}
```
