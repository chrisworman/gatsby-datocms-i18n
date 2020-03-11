#!/bin/bash

echo "This script assumes zsh is your default shell"

# Ensure nvm
if [[ $(command -v nvm) ]]; then
    echo "✓ nvm found"
else
    echo "- installing nvm"
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
    source ~/.zshrc
fi

# Ensure node and use correct version
nvm install v13.10.1
nvm use

# Ensure yarn
if [[ $(which yarn) ]]; then
    echo "✓ yarn found"
else
    echo "- installing yarn"
    brew install yarn
fi

# Install gatsby-cli globally
yarn global add gatsby-cli

# Install dependencies
yarn install