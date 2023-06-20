import subprocess


def execute_command(command):
    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    stdout, stderr = process.communicate()
    return process.returncode, stdout.decode(), stderr.decode()


def git_commands(comment):
    print("Adding changes to the main branch")
    git_pull = "git pull origin main"
    git_add_cmd = "git add *"
    git_commit_cmd = 'git commit -m "{}"'.format(comment)
    git_push_cmd = "git push -f origin main"

    combined_cmd = "{} && {} && {} && {}".format(
        git_add_cmd, git_commit_cmd, git_pull, git_push_cmd
    )
    returncode, stdout, stderr = execute_command(combined_cmd)
    print(stdout, stderr)


def npm_build(comment):
    print("Adding changes to the gh-pages branch")
    npm_cmd = "npm run build"
    git_add = "git add dist -f"
    git_commit = 'git commit -m "Update dist" '
    git_delete = "git push --delete origin gh-pages"
    git_push_cmd = "git subtree push --prefix dist origin gh-pages "

    combined_cmd = "{} && {} && {} && {} && {}".format(
        npm_cmd, git_add, git_commit, git_delete, git_push_cmd
    )
    returncode, stdout, stderr = execute_command(combined_cmd)
    print(stdout, returncode)


comment = input("Enter your Git comment:: ")

git_commands(comment)

npm_build(comment)
