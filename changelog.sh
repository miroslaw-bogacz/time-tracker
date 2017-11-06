#!/usr/bin/env bash

git_logs=$(git log `git describe --tags --abbrev=0 HEAD^`..HEAD --oneline)

git_logs_features=$(grep 'feature/' --ignore-case <<< "$git_logs")

if [ "$git_logs_features" ]
then
    echo ""
    echo "## Features"
    while IFS= read -r line
    do
        echo "- $line"
    done <<< "$git_logs_features"
fi

git_logs_layouts=$(grep 'layout/' --ignore-case <<< "$git_logs")

if [ "$git_logs_layouts" ]
then
    echo ""
    echo "## Layouts"
    while IFS= read -r line
    do
        echo "- $line"
    done <<< "$git_logs_layouts"
fi

git_logs_bugfixes=$(grep 'bugfix/' --ignore-case <<< "$git_logs")

if [ "$git_logs_bugfixes" ]
then
    echo ""
    echo "## Bug fixes"
    while IFS= read -r line
    do
        echo "- $line"
    done <<< "$git_logs_bugfixes"
fi

git_logs_developments=$(grep 'development/' --ignore-case <<< "$git_logs")

if [ "$git_logs_developments" ]
then
    echo ""
    echo "## Development"
    while IFS= read -r line
    do
        echo "- $line"
    done <<< "$git_logs_developments"
fi
