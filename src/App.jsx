import React, { useState } from 'react';
import { 
  BookOpen, 
  TerminalSquare, 
  GitBranch, 
  Globe, 
  RotateCcw,
  Building2, 
  Zap,
  ChevronRight,
  Terminal,
  Info,
  AlertTriangle,
  Menu,
  ExternalLink
} from 'lucide-react';

// --- FULL, UNABRIDGED COURSE DATA ---
const courseData = [
  {
    id: "phase0",
    title: "Phase 0: History & Philosophy",
    icon: BookOpen,
    overview: "Git was forged in an absolute crisis to solve the logistical nightmare of thousands of strangers collaborating on the Linux kernel.",
    sections: [
      {
        title: "1. The Pre-Git Era & The Crisis of 2005",
        blocks: [
          { type: 'text', content: "Before Git, the software industry relied on <strong>Centralized Version Control Systems (CVCS)</strong>, the most popular being SVN (Subversion). Imagine a hub-and-spoke model. One massive master server sits in a room holding the entire history. Everyone else is a 'spoke'. To look at history, create a branch, or save code, you had to ask the master server for permission over the network." },
          { type: 'text', content: "<strong>The Fatal Flaw:</strong> If the server crashed, nobody could work. On a flight without Wi-Fi? You can't commit code. Branching required copying the entire project on the server, which was so slow that developers avoided it, leading to massive, painful code merges later. <em>(Meme representation: A developer skeleton sitting at a desk waiting for an SVN branch to finish copying on the central server.)</em>" },
          { type: 'text', content: "<strong>The Linux Crisis (April 2005):</strong> The Linux Kernel is a massive OS built by thousands of global developers. They used a proprietary distributed tool called BitKeeper. A developer tried to reverse-engineer it, the CEO got furious, and revoked the free license. Suddenly, the biggest open-source project on Earth had no way to collaborate." },
          { type: 'text', content: "Linus Torvalds, the creator of Linux, looked at tools like SVN and absolutely hated them. Over a single weekend, he locked himself in a room and wrote a completely new version control system from scratch." },
          { type: 'quote', content: "I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'Git'. — Linus Torvalds" }
        ]
      },
      {
        title: "2. Torvalds' Three Mandates",
        blocks: [
          { type: 'text', content: "Because he built it for an operating system, Git was engineered with three obsessions:" },
          { type: 'text', content: "<strong>1. 100% Distributed:</strong> Every developer has the full history on their machine. No internet required to work. No single point of failure." },
          { type: 'text', content: "<strong>2. Cryptographically Secure:</strong> With thousands of strangers contributing, you need to trust the data. Git hashes everything. If a single comma changes maliciously, the system instantly detects the corruption." },
          { type: 'text', content: "<strong>3. Instant Branching:</strong> Torvalds wanted developers to branch, experiment, and delete branches in milliseconds." }
        ]
      },
      {
        title: "3. What Actually is Git? (Core Mechanics)",
        blocks: [
          { type: 'text', content: "In technical terms, <strong>Git</strong> is a free, open-source <strong>Distributed Version Control System (DVCS)</strong>. Think of it as a time machine and a highly advanced 'Save' button. It stops the madness of having <code>resume_v2.pdf</code>, <code>resume_final.pdf</code>, and <code>resume_FINAL_REAL.pdf</code>." },
          { type: 'text', content: "<strong>Nearly Every Operation is Local:</strong> Because you have the entire project history sitting right on your local hard drive, Git is incredibly fast and independent. You don’t need to ask a remote server to view history. <em>(Captain Phillips meme: 'Look at me. I am the server now.')</em>" },
          { type: 'text', content: "<strong>Git Generally Only Adds Data:</strong> It is very difficult to accidentally erase data once saved in Git. When you 'delete' a file, Git creates a new snapshot where it's missing, but the old snapshot is safely stored. <em>(He protec, he track, but most importantly, he always bring your lost data bac.)</em>" }
        ]
      },
      {
        title: "4. Snapshots vs. Deltas (The Core Concept)",
        blocks: [
          { type: 'text', content: "This is the most important concept to understand for interviews. Older systems (SVN) tracked <strong>Deltas (Changes)</strong>. They saved the base file, and then kept a running list of lines added/removed. To see what a file looked like a year ago, the system had to rebuild it by calculating a year's worth of math." },
          { type: 'text', content: "<strong>Git tracks Snapshots.</strong> When you save (commit), Git essentially takes a mathematical photograph of what all your files look like at that exact millisecond. If a file didn't change, Git doesn't duplicate it; it stores a lightweight link pointing to the identical previous version." },
          { type: 'table', 
            headers: ["SVN (Deltas) 📉", "Git (Snapshots) 📸"],
            rows: [
              ["Tracks file changes line-by-line.", "Tracks the state of the entire filesystem."],
              ["Branching means copying files (slow).", "Branching means moving a lightweight pointer (instant)."]
            ]
          }
        ]
      },
      {
        title: "5. The Three States of Git",
        blocks: [
          { type: 'text', content: "If you only remember one thing from this phase, make it this. Files in Git reside in one of three main states. This is the secret to knowing exactly what Git is doing at any given moment." },
          { type: 'table', 
            headers: ["State", "Conceptual Meaning", "Where it physically lives"],
            rows: [
              ["Modified", "You changed the file on your computer, but haven't told Git to save it yet.", "Working Tree (Your current checkout)"],
              ["Staged", "You marked a modified file to be included in your NEXT commit snapshot.", "Staging Area / Index (Loading dock)"],
              ["Committed", "The data is safely stored as a permanent cryptographic snapshot.", "Local Repository (The hidden .git vault)"]
            ]
          },
          { type: 'text', content: "<em>Why a Staging Area?</em> It gives you precision. If you fix two different bugs, you shouldn't lump all files into one messy commit. The staging area lets you selectively stage just the files for Bug A, commit them, and then stage the files for Bug B." }
        ]
      },
      {
        title: "6. The Engine vs. The Hub",
        blocks: [
          { type: 'text', content: "Git was a masterpiece, but it was brutal to use via the command line and had no way to share code (you literally emailed files). In 2008, GitHub was built." },
          { type: 'text', content: "<strong>Git = The Engine:</strong> The local version control software on your laptop." },
          { type: 'text', content: "<strong>GitHub = The Hub:</strong> The cloud-based social network and hosting platform for Git repositories. It introduced <strong>The Fork</strong> (a 1-click button to safely copy a stranger's codebase) and <strong>The Pull Request (PR)</strong> (a neat way to ask the original author to pull your improvements in)." }
        ]
      }
    ]
  },
  {
    id: "phase1",
    title: "Phase 1: The Local Engine",
    icon: TerminalSquare,
    overview: "Mastering the daily single-player loop and understanding how Git manages your files under the hood.",
    sections: [
      {
        title: "1. The Setup & Initialization",
        blocks: [
          { type: 'text', content: "<strong>The Identity Concept:</strong> Remember how Git was built for thousands of Linux kernel developers? Git has a strict rule: <em>Anonymous saves are illegal.</em> Before taking a snapshot, it forces you to configure your Name and Email so every commit has an exact audit trail." },
          { type: 'text', content: "<strong>The Initialization Concept:</strong> Git does not automatically watch every file on your computer. Initializing a repository is like installing a security camera system. When you run <code>git init</code>, Git creates a hidden <code>.git</code> folder. Without this vault, Git doesn't exist for that project." },
          { type: 'commands', commands: [
            { cmd: 'git config --global user.name "Your Name"', desc: "Stamps your identity permanently on your computer." },
            { cmd: 'git config --global user.email "your.email@example.com"', desc: "Links your email to your commits." },
            { cmd: "git init", desc: "Turns on the 'Invisible Watcher' by creating the .git folder." }
          ]}
        ]
      },
      {
        title: "2. The Three-Tree Architecture (Visualized)",
        blocks: [
          { type: 'text', content: "Git actually tracks your project across three distinct environments (or 'trees') simultaneously. Files flow strictly from left to right. They must pass through the Staging Area before they become permanent history." },
          { type: 'ascii', content: `[ Tree 1: Working Dir ]  -->  [ Tree 2: Staging Area ]  -->  [ Tree 3: Repository (HEAD) ]
   (Your Messy Desk)               (The Loading Dock)               (The Permanent Vault)` },
          { type: 'table',
            headers: ["Working Directory", "Staging Area (Index)", "Repository (HEAD)"],
            rows: [
              ["Physical files on your hard drive", "Hidden .git/index binary file", "Hidden .git/objects database"],
              ["Untracked or Modified files", "Staged files", "Committed snapshots"],
              ["Unsafe (Data can be lost)", "Safe buffer zone", "Permanent (Cryptographically locked)"]
            ]
          }
        ]
      },
      {
        title: "3. The Object Model (Under the Hood)",
        blocks: [
          { type: 'text', content: "Git is a <strong>Content-Addressable Database</strong>. It calculates the SHA-1 hash of your file's content and stores it as one of four object types in <code>.git/objects/</code>. <em>The Directory Trick:</em> It uses the first 2 characters of the hash as a folder name, and the remaining 38 as the filename." },
          { type: 'table',
            headers: ["Object Type", "Conceptual Role", "Technical System View"],
            rows: [
              ["🟢 Blob", "Raw file data (unlabelled page)", "Stores content, NOT names. If you rename a file but keep content identical, the Blob hash is the same."],
              ["🟦 Tree", "Folder structure (Table of Contents)", "A directory listing mapping human-readable filenames to Blob hashes."],
              ["🔴 Commit", "Timeline metadata (Published Edition)", "Points directly to a root Tree, and stores author, timestamp, and Parent Commit Hash."],
              ["🟡 Tag", "Permanent Release Milestone", "An immutable, cryptographically signed marker pointing to a specific Commit hash (e.g., v1.0.0)."]
            ]
          },
          { type: 'text', content: "<strong>System Scenario:</strong> If your workspace has ten identical copies of a 10MB image in different folders, does your repository size grow by 100MB? <strong>No!</strong> Git calculates the hash, realizes it's identical, stores exactly ONE copy of the 10MB Blob, and creates ten tiny Tree pointers to it." }
        ]
      },
      {
        title: "4. The Directed Acyclic Graph (DAG)",
        blocks: [
          { type: 'text', content: "Git stores history as a mathematical data structure called a <strong>Directed Acyclic Graph (DAG)</strong>. <strong>Graph:</strong> Nodes (commits) connected by edges (parent pointers). <strong>Directed:</strong> Commits only point backward in time. <strong>Acyclic:</strong> History cannot loop." },
          { type: 'ascii', content: `[ The Branching Timeline (Parallel Universes) ]
                                           (main branch)
                                                 │
                                                 ▼
  [ Commit: A ] ◄─────── [ Commit: B ] ◄─────── [ Commit: C ]
                           ▲
                           │
                           └──── [ Commit: D ] ◄─────── [ Commit: E ]
                                                              ▲
                                                              │
                                                       (feature branch)`},
          { type: 'text', content: "<strong>Immutability & The Ripple Effect:</strong> If you use <code>git commit --amend</code> to fix a typo in Commit B, its SHA-1 hash completely changes. Because Commit C explicitly points to the *old* hash, Commit C must also be rewritten. Changing a commit in the past mathematically forces Git to rewrite every single child commit that comes after it!" }
        ]
      },
      {
        title: "5. The Daily Loop & Atomic Commits",
        blocks: [
          { type: 'text', content: "<strong>The Atomic Commit Pro-Tip:</strong> An atomic commit contains ONE irreducible logical change. Don't dump 1,000 lines into one commit. Use <code>git add</code> to surgically group files: Commit 1 (DB schema), Commit 2 (API endpoint). This allows senior engineers to easily review code, and lets you safely revert just one piece if production breaks." },
          { type: 'text', content: "<em>The Rule of Commits: A commit message should complete this sentence: 'If applied, this commit will [Your descriptive message here]'.</em>" },
          { type: 'commands', commands: [
            { cmd: "git status", desc: "Your radar. Tells you exactly what state files are in across the Three Trees." },
            { cmd: "git add .", desc: "Moves files from Tree 1 to Tree 2. Git compresses it into a blob and calculates the hash." },
            { cmd: 'git commit -m "msg"', desc: "Packages Tree 2 into a permanent snapshot (Commit object) in Tree 3." },
            { cmd: "git log", desc: "Reads the receipts. Prints the DAG timeline in chronological order." }
          ]}
        ]
      },
      {
        title: "6. Interview Framing: The `git reset` Question",
        blocks: [
          { type: 'text', content: "<strong>Question:</strong> Can you explain the difference between git reset --soft, --mixed, and --hard?" },
          { type: 'text', content: "<strong>Answer:</strong> All reset commands move the HEAD pointer backward in the Repository (Tree 3). The difference is what they do to the other two trees." },
          { type: 'table',
            headers: ["Command", "Tree 3: Repo", "Tree 2: Staging", "Tree 1: Working Dir", "Use Case"],
            rows: [
              ["--soft", "⏪ Moved Back", "✅ Untouched", "✅ Untouched", "Squashing multiple messy commits into one clean commit."],
              ["--mixed", "⏪ Moved Back", "❌ Emptied", "✅ Untouched", "Un-staging files you accidentally added."],
              ["--hard", "⏪ Moved Back", "❌ Emptied", "⚠️ Overwritten", "DANGEROUS: Instantly deleting any unsaved code to match the past."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "phase2",
    title: "Phase 2: Branching & Merging",
    icon: GitBranch,
    overview: "A branch is not a folder. It is just a 41-byte sticky note pointing to a specific commit.",
    sections: [
      {
        title: "1. Branches as Pointers & The HEAD Pointer",
        blocks: [
          { type: 'text', content: "<strong>The Myth:</strong> Creating a branch literally copies all your files into a new folder." },
          { type: 'text', content: "<strong>The Reality:</strong> Git already has your snapshots in the DAG. A branch is simply a 41-byte text file located at <code>.git/refs/heads/feature</code> containing a 40-character hash. This is why branching takes 1 millisecond." },
          { type: 'text', content: "<strong>The HEAD Pointer:</strong> How does Git know which sticky note you are looking at? The <code>HEAD</code> pointer acts as a 'You Are Here' marker. When you run <code>git switch feature</code>, Git updates <code>.git/HEAD</code> and instantly swaps the physical files in your Working Directory to match." },
          { type: 'ascii', content: `[ How Git knows what files to show you ]

(HEAD) ──points to──► [ branch: feature-login ] ──points to──► [ Commit: C ]` }
        ]
      },
      {
        title: "2. The Boss Fight: Detached HEAD State",
        blocks: [
          { type: 'alert', content: "⚠️ You are in 'detached HEAD' state." },
          { type: 'text', content: "This happens when you check out a specific commit in the past instead of a branch name. Your HEAD pointer detaches from a branch and points directly to a raw Commit hash. If you write code here, your new commits have NO sticky note pointing to them. When you switch back to main, they become 'orphaned' and will be deleted by the garbage collector." },
          { type: 'text', content: "<strong>The Fix:</strong> Run <code>git switch -c rescue-branch</code> to instantly slap a sticky note on your floating commits." }
        ]
      },
      {
        title: "3. Merging: Collapsing the Multiverse",
        blocks: [
          { type: 'text', content: "<strong>The Golden Rule:</strong> You must always stand on the destination branch before you pull changes in (e.g., switch to main, then merge feature)." },
          { type: 'text', content: "<strong>Algorithm A: Fast-Forward:</strong> If main hasn't changed since you branched off, Git doesn't do complex math. It just slides the main sticky note forward." },
          { type: 'ascii', content: `[ FAST-FORWARD MERGE ]
(main) ──────────────► [ Commit: A ] ◄─────── [ Commit: B ] ◄──── (feature)

                                 [ git merge feature ]

                       [ Commit: A ] ◄─────── [ Commit: B ] 
                                                   ▲
                                            (main & feature)` },
          { type: 'text', content: "<strong>Algorithm B: The 3-Way Merge:</strong> If timelines physically diverged, Git uses the tips of both branches plus their Common Ancestor to calculate a brand new Merge Commit that weaves both realities together. Notice the new commit has TWO parent pointers!" },
          { type: 'ascii', content: `[ 3-WAY MERGE ARCHITECTURE ]
                       [ Commit: B ] ◄──── (main)
                     /                   │
  [ Commit: A ] ◄──                      ▼
                   \\               [ MERGE COMMIT: D ] ◄──── (main)
                     \\                   ▲
                       [ Commit: C ] ◄───┘
                                           ▲
                                       (feature)` }
        ]
      },
      {
        title: "4. Merge Conflicts & Resolution",
        blocks: [
          { type: 'text', content: "Conflicts happen when you and a coworker change the exact same line of the exact same file. Git pauses the 3-Way Merge and asks a human to decide, injecting visual markers into the file." },
          { type: 'ascii', content: `<nav>
<<<<<<< HEAD 
  <button>Pay with UPI</button>
=======
  <button>Pay with Credit Card</button>
>>>>>>> feature-login 
</nav>` },
          { type: 'text', content: "<strong>Resolution Steps:</strong> 1. Open the file. 2. Delete the markers (<<<<, ====, >>>>). 3. Edit the code exactly how you want it. 4. Run <code>git add</code> to mark it resolved. 5. Run <code>git commit</code> to finalize the Merge Commit." }
        ]
      },
      {
        title: "5. The Diff Architecture",
        blocks: [
          { type: 'text', content: "Before you add or commit, you need to see what changed. Because Git tracks three trees, there are different diff commands." },
          { type: 'ascii', content: `[ Tree 1: Working Dir ]       [ Tree 2: Staging Area ]       [ Tree 3: Repository (HEAD) ]
          │                              │                                │
          │◄──────── git diff ──────────►│                                │
          │                              │◄───── git diff --staged ──────►│
          │◄────────────────────── git diff HEAD ────────────────────────►│` }
        ]
      },
      {
        title: "6. Branching & Merging Toolkit",
        blocks: [
          { type: 'commands', commands: [
            { cmd: "git branch <name>", desc: "Creates a new branch sticky note but keeps you where you are." },
            { cmd: "git switch -c <name>", desc: "Creates a new branch AND moves HEAD to it in one step." },
            { cmd: "git merge <name> --no-ff", desc: "Forces Git to create a 2-parent Merge Commit, even if Fast-Forward is possible, preserving the feature bubble." },
            { cmd: "git branch -D <name>", desc: "Force deletes a branch, destroying unmerged work." }
          ]}
        ]
      }
    ]
  },
  {
    id: "phase3",
    title: "Phase 3: Remotes & GitHub",
    icon: Globe,
    overview: "Synchronizing your local Directed Acyclic Graph (DAG) with a database running on a cloud server.",
    sections: [
      {
        title: "1. Local vs. Remote: The Camera Analogy",
        blocks: [
          { type: 'text', content: "<strong>GitHub doesn't track your files. Your local laptop does.</strong> Think of Git like a digital camera, and GitHub like Instagram." },
          { type: 'text', content: "Running <code>git init</code> is turning on your camera. <code>git commit</code> is taking pictures and saving them to the SD card. You cannot push 'files' to GitHub; you can only push Commits. If you try to push without committing, Git says 'I have no history to upload!'. Everything happens locally first." }
        ]
      },
      {
        title: "2. Remotes & The Address Book",
        blocks: [
          { type: 'text', content: "To send code to the internet, Git uses <strong>Remotes</strong>—local nicknames for long internet URLs." },
          { type: 'text', content: "<strong>What is origin?</strong> It is not a magic server. It is simply the default nickname Git gives to your primary remote URL. Running <code>git remote add origin</code> doesn't connect to the internet; it simply writes a bookmark in your local <code>.git/config</code> file." }
        ]
      },
      {
        title: "3. Step-by-Step: Local to GitHub Upload",
        blocks: [
          { type: 'text', content: "<strong>Phase A (Local):</strong> Turn on camera (`git init`). Move code to loading dock (`git add .`). Take snapshot (`git commit -m 'Initial commit'`)." },
          { type: 'text', content: "<strong>Phase B (GitHub):</strong> Create a New Repository. <em>CRITICAL: Leave README, gitignore, and License UNCHECKED.</em> If you check them, GitHub creates 'Commit #1', causing a 'refusing to merge unrelated histories' error when your local timeline tries to upload." },
          { type: 'text', content: "<strong>Phase C (Bridge & Upload):</strong> Run <code>git remote add origin URL</code> (build the bridge). Run <code>git branch -M main</code> (name the timeline). Run <code>git push -u origin main</code> (compress and upload)." }
        ]
      },
      {
        title: "4. Uploading Data: The Packfile Architecture",
        blocks: [
          { type: 'text', content: "When you run <code>git push -u origin main</code>, Git negotiates with GitHub to figure out exactly which Commits, Trees, and Blobs are missing. It gathers them, compresses them into a highly optimized binary file called a <strong>packfile (.pack)</strong>, and transmits it over the network." },
          { type: 'ascii', content: `[ Local Laptop (.git) ]                              [ GitHub Server (.git) ]
                                
[ Commit: C ] (new) ───┐
[ Commit: B ] (new) ───┼──(Compresses)──► [ data.pack ] ──(Network)──► (Unpacks and updates DAG)
[ Commit: A ] (old) ───┘` },
          { type: 'text', content: "The <code>-u</code> flag (upstream) writes a permanent tracking link inside your config file binding your local branch to GitHub's branch, so for future uploads you only have to type <code>git push</code>." }
        ]
      },
      {
        title: "5. The Fetch vs. Pull Interview Trap",
        blocks: [
          { type: 'alert', content: "Never run `git pull` blindly if you have uncommitted, messy files on your local Working Directory." },
          { type: 'text', content: "<strong>Question:</strong> What is the difference between git fetch and git pull?" },
          { type: 'text', content: "<strong>Answer:</strong> <code>git pull</code> is a shortcut macro that runs <code>git fetch</code> followed immediately by <code>git merge</code>." },
          { type: 'text', content: "<strong>Step 1: <code>git fetch</code></strong> connects to GitHub, downloads new commits, and HIDES them in a special buffer called a Remote Tracking Branch (e.g., <code>origin/main</code>). It does NOT touch your Working Directory." },
          { type: 'text', content: "<strong>Step 2: <code>git merge origin/main</code></strong> integrates those downloaded changes into your active branch safely, after you have cleaned up your desk." },
          { type: 'ascii', content: `[ Remote Database (GitHub) ]
            │
            │  1. git fetch (Downloads data safely)
            ▼
[ Local Tracking Branch: origin/main ]  <-- (Hidden buffer)
            │
            │  2. git merge (Integrates code)
            ▼
[ Local Active Branch: main ]           <-- (Updates Working Directory)` }
        ]
      },
      {
        title: "6. The Open Source Workflow (Forking)",
        blocks: [
          { type: 'text', content: "If you want to contribute to Facebook's React, you cannot just push to their repository (you lack write access). You must use the Fork and PR workflow." },
          { type: 'table',
            headers: ["Step", "Action", "What it means conceptually"],
            rows: [
              ["1. Fork", "Click 'Fork' on GitHub", "GitHub makes an isolated copy of Facebook's database in YOUR personal account."],
              ["2. Clone", "git clone <your-fork-url>", "Downloads your cloud copy to your laptop."],
              ["3. Branch", "git switch -c fix-bug", "Create a safe timeline locally and lock your snapshots."],
              ["4. 2nd Remote", "git remote add upstream <fb-url>", "Connect your laptop to Facebook's original repo so you can fetch their updates."],
              ["5. Push", "git push origin fix-bug", "Uploads code to YOUR personal cloud copy."],
              ["6. PR", "Click 'New PR' on GitHub", "Formal request asking Facebook to run 'git merge' to pull your code into their master repo."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "phase4",
    title: "Phase 4: Time Travel & Recovery",
    icon: RotateCcw,
    overview: "The 'Danger Zone'. How to undo mistakes, bend time, and rewrite history like a Git Wizard.",
    sections: [
      {
        title: "1. The Safe Undo (Before Committing)",
        blocks: [
          { type: 'text', content: "If you make a mess on your desk but haven't locked it in the vault yet, you use <code>git restore</code> (introduced in 2019 to replace the older, confusing <code>checkout -- file</code>)." },
          { type: 'text', content: "<code>git restore --staged &lt;file&gt;</code> un-stages a file, moving it from Tree 2 back to Tree 1." },
          { type: 'text', content: "<code>git restore &lt;file&gt;</code> copies the file from HEAD (Tree 3) directly into your Working Directory (Tree 1). <strong>⚠️ Destructive:</strong> Your uncommitted code is instantly overwritten and deleted." }
        ]
      },
      {
        title: "2. Timeline Surgery: Rebase",
        blocks: [
          { type: 'alert', content: "The Golden Rule of Rebasing: NEVER rebase commits that exist outside your local repository!" },
          { type: 'text', content: "While <code>git merge</code> combines timelines safely, sometimes managers demand a perfectly straight, linear history. <code>git rebase main</code> unplugs your feature branch, fast-forwards it, and plugs it back in at the very front of main." },
          { type: 'ascii', content: `[ AFTER REBASE ]
(Git rewrites D and E, placing them directly on top of C. The graph is now a straight line!)

  [ A ] ◄── [ B ] ◄── [ C ] ◄── [ D' ] ◄── [ E' ] ◄──── (feature)
                        ▲
                        │
                      (main)` },
          { type: 'text', content: "<strong>The Disaster Scenario:</strong> Because history is immutable, rebase creates brand NEW commits (D', E') and deletes the old ones. If you rebase commits you already pushed to GitHub, your local timeline completely conflicts with the server's timeline. If you force-push, you will break your coworkers' repositories." }
        ]
      },
      {
        title: "3. Cherry-Picking",
        blocks: [
          { type: 'text', content: "Sometimes you don't want to merge an entire branch. You just want to steal one specific brilliant commit from another timeline." },
          { type: 'ascii', content: `[ THE TARGET (payment branch) ]
── [ Commit: X ] ── [ Commit: Y (BUG FIX) ] ── [ Z ]

                             [ git cherry-pick <Hash-of-Y> ]

[ AFTER CHERRY-PICK (feature branch) ]
(Git calculates the diff of Y, and applies it as a brand new commit)
── [ Commit: A ] ── [ Commit: B ] ── [ Commit: Y' ]` }
        ]
      },
      {
        title: "4. Reset vs. Revert (The Interview Question)",
        blocks: [
          { type: 'text', content: "<strong>Question:</strong> You pushed a bug to the public GitHub repository. Do you use git reset or git revert?" },
          { type: 'text', content: "<strong>Answer:</strong> I would absolutely use <code>git revert</code>. <code>git reset</code> deletes history. If I force-push a reset, it causes synchronization chaos for my team." },
          { type: 'text', content: "<code>git revert</code> is a safe, forward-moving operation. It calculates the exact mathematical inverse of the bug, and creates a brand NEW commit that undoes the changes. The DAG remains intact." },
          { type: 'ascii', content: `[ AFTER REVERTING COMMIT B ]

[ A ] ◄── [ B (BUG!) ] ◄── [ C ] ◄── [ Commit: B' (FIX: Undoes B) ] ◄──── (main)` }
        ]
      },
      {
        title: "5. Stashing (The Emergency Clipboard)",
        blocks: [
          { type: 'text', content: "Your boss demands a hotfix, but your desk is full of broken code you can't commit. You cannot switch branches because Git warns files will be overwritten." },
          { type: 'text', content: "<code>git stash</code> sweeps all uncommitted, messy files into a hidden box on a shelf (creating two temporary Commit objects). You switch branches, fix the bug, and later run <code>git stash pop</code> to drop your broken code back onto your desk." },
          { type: 'ascii', content: `[ THE SHELF (Stash Stack) ]
  stash@{0}: WIP on feature-login (Latest Stash)
  stash@{1}: WIP on broken-css-fixes
       │
       ▼
[ YOUR DESK (Working Directory) ]
  (Currently clean, ready to switch branches!)` }
        ]
      },
      {
        title: "6. The Reflog (The Black Box Recorder)",
        blocks: [
          { type: 'text', content: "The ultimate safety net. It is a hidden, local diary (<code>.git/logs/HEAD</code>) that records EVERY single time the HEAD pointer moves, even during destructive resets." },
          { type: 'ascii', content: `[ Output of \`git reflog\` ]
8b1378f HEAD@{0}: reset: moving to HEAD~1  <-- (The mistake!)
c4d2e9a HEAD@{1}: commit: Wrote 3 days of amazing code    <-- (The "deleted" code!)` },
          { type: 'text', content: "<strong>Recovery Option A:</strong> <code>git reset --hard c4d2e9a</code> (Reverses time back to before the mistake)." },
          { type: 'text', content: "<strong>Recovery Option B:</strong> <code>git branch rescue-me c4d2e9a</code> (Safely slaps a sticky note on the lost commit, rescuing it from being garbage collected)." }
        ]
      }
    ]
  },
  {
    id: "phase5",
    title: "Phase 5: Enterprise Workflows",
    icon: Building2,
    overview: "In production environments, the way code moves from a developer's brain to a live server running on the cloud must be completely automated, standardized, and secure.",
    sections: [
      {
        title: "1. The Two Main Branching Strategies",
        blocks: [
          { type: 'text', content: "Every engineering organization chooses one of two major philosophies to manage their DAG at scale." },
          { type: 'text', content: "<strong>Strategy A: GitFlow (The Traditional Heavyweight)</strong><br/>Extreme safety through isolation. Features move through a strict hierarchy: <code>Feature</code> ➔ <code>Develop</code> ➔ <code>Release</code> ➔ <code>Main</code>. Best used for enterprise software with scheduled, monolithic release cycles (like banking apps)." },
          { type: 'ascii', content: `[ GitFlow DAG Visual ]
(Sacred Main)   ───────────────────────────────► [ Release v1.0 ] ──► (Production)
                                                     ▲
(Release Bch)   ──────────────────┐                 │
                                  ▼                 │
(Develop Bch)   ─── [ Sprint Start ] ───────────────┴───────────────► (Staging)
                     \\             ▲
                      ▼           /
(Feature Bch)          [ Code Bug Fix ] ◄── (Developer Workspace)` },
          { type: 'text', content: "<strong>Strategy B: Trunk-Based Development (The Modern Speedster)</strong><br/>Extreme speed through micro-integrations. Everyone clones one single main branch ('Trunk'). Features are short-lived (1-2 days) and merged directly into the trunk immediately. Best for high-velocity SaaS teams utilizing cloud microservices." },
          { type: 'ascii', content: `[ Trunk-Based DAG Visual ]
(The Trunk)     ─── [ Commit ] ─── [ Commit ] ─── [ Merge ] ─── [ Commit ] ──► (Continuous Prod)
                     \\                             ▲
                      └──► [ Short Feature Bch ] ──┘ (1-2 days max)` },
          { type: 'table',
            headers: ["Feature / Metric", "🐢 GitFlow", "⚡ Trunk-Based Development"],
            rows: [
              ["Release Velocity", "Slow (Scheduled batches/sprints)", "Extremely Fast (Continuous delivery)"],
              ["Branch Lifespan", "Long-lived (Weeks or months)", "Short-lived (Hours to days)"],
              ["Merge Complexity", "High ('Merge Hell' at end of sprint)", "Low (Small, constant increments)"],
              ["Feature Control", "Controlled by environment switches", "Controlled dynamically via Feature Flags"]
            ]
          }
        ]
      },
      {
        title: "2. The Automation Engine: CI/CD Pipelines",
        blocks: [
          { type: 'text', content: "Once code is merged into an enterprise branch, no human should ever manually compile or zip files onto a server. An automated engine takes over." },
          { type: 'text', content: "<strong>Continuous Integration (CI):</strong> The moment you open a Pull Request, the CI pipeline acts as a digital quality inspector (runs tests, linters, coverage). If a single test fails, the PR turns red and blocks the merge." },
          { type: 'ascii', content: `[ The CI Gatekeeper Loop ]
Developer opens PR ➔ Pipeline spins up Docker ➔ Compiles Code ➔ Runs Unit Tests
                                                                               │
       ┌───────────────────────── SUCCESS ─────────────────────────────────────┤
       ▼                                                                       ▼
PR Approved for Human Review                                            PR Locked / Red Light ❌` },
          { type: 'text', content: "<strong>Continuous Deployment (CD):</strong> Once a senior engineer clicks 'Merge', the CD pipeline takes the validated code, builds a Docker artifact, pushes it to a cloud registry, and initiates a Zero-Downtime Rollout (like Blue-Green Deployment)." }
        ]
      },
      {
        title: "3. Interview Framing: Feature Flags",
        blocks: [
          { type: 'text', content: "<strong>Question:</strong> If Trunk-Based development forces developers to merge code directly into the main trunk every single day, how do you prevent half-finished features from accidentally displaying to real customers on the production website?" },
          { type: 'text', content: "<strong>Answer:</strong> We handle this by using a pattern called <strong>Feature Flags</strong> (or Feature Toggles)." },
          { type: 'text', content: "Instead of hiding uncompleted code on a long-lived Git branch, we wrap the uncompleted feature inside a conditional block in the source code." },
          { type: 'ascii', content: `if (featureFlags.isEnabled("NEW_UPI_PAYMENT_GATEWAY")) {
    executeNewPaymentEngine();
} else {
    executeLegacyPaymentEngine();
}` },
          { type: 'text', content: "This allows us to safely compile and deploy the uncompleted feature directly to production every day. The code remains completely dark. When the business is ready to launch weeks later, we just flip the flag to `true` in a cloud portal—without needing to create a new Git commit or redeploy code." }
        ]
      }
    ]
  },
  {
    id: "bonus",
    title: "Bonus: Productivity Tools",
    icon: Zap,
    overview: "Quality-of-life utilities senior engineers use to debug faster and multi-task.",
    sections: [
      {
        title: "1. The Detective Tools",
        blocks: [
          { type: 'text', content: "<strong>git blame &lt;file&gt;:</strong> A tool for context. Shows exactly who last modified every single line in a file, and in which commit they did it." },
          { type: 'text', content: "<strong>git bisect:</strong> Absolute senior-level magic. Performs a mathematical binary search across your timeline. Instead of checking 400 commits manually to find a bug, you tell Git the bad commit and a past good commit. Git jumps to the middle, asks if it works, and halves the search area until it finds the exact commit that broke the app in just 8 steps." }
        ]
      },
      {
        title: "2. The Oops Fixer",
        blocks: [
          { type: 'text', content: "<strong>git commit --amend:</strong> You just hit enter and realized you forgot a CSS file or made a typo in the message. Run <code>git add</code> for the forgotten file, then <code>git commit --amend</code>. Git cracks open the previous commit, slips the file inside, and seals it back up." },
          { type: 'alert', content: "Warning: Under the hood, --amend creates a brand NEW commit hash and replaces the old one. Never amend a commit you have already pushed to GitHub!" }
        ]
      },
      {
        title: "3. Marking Milestones (Tags)",
        blocks: [
          { type: 'text', content: "While branches are sticky notes that *move* every time you commit, Tags are permanent, immovable labels stamped onto a specific commit (usually used for production releases like v1.0.0)." },
          { type: 'commands', commands: [
            { cmd: 'git tag -a v1.0.0 -m "Release"', desc: "Creates an 'Annotated' tag object. A cryptographically verifiable release." },
            { cmd: "git push origin v1.0.0", desc: "Pushes the tag to GitHub (normal git push does NOT upload tags!)." }
          ]}
        ]
      },
      {
        title: "4. The Ultimate Multi-Tasker (Worktrees)",
        blocks: [
          { type: 'text', content: "You are deep in the zone coding a massive feature. Your boss tells you to review a coworker's branch immediately. Normally, you'd have to stash your work." },
          { type: 'text', content: "<strong>git worktree add ../review-folder branch-B:</strong> Creates a brand new physical folder on your laptop, but connects it to your *same* <code>.git</code> database. You can open BOTH branches in two different VS Code windows at the exact same time!" }
        ]
      },
      {
        title: "5. Quality of Life: Aliases",
        blocks: [
          { type: 'text', content: "Typing long commands 100 times a day leads to fatigue. You can program Git to understand custom shortcuts using <code>git config</code>." },
          { type: 'commands', commands: [
            { cmd: "git config --global alias.co checkout", desc: "Make 'git co' do the same thing as 'git checkout'." },
            { cmd: "git config --global alias.st status", desc: "Make 'git st' do the same thing as 'git status'." },
            { cmd: 'git config --global alias.graph "log --all --decorate --oneline --graph"', desc: "MAGIC LOG: Draws a beautiful colored DAG tree in your terminal!" }
          ]}
        ]
      }
    ]
  }
];

// --- UI Components ---

const TerminalWindow = ({ children }) => (
  <div className="w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shadow-xl my-4 flex flex-col">
    <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="mx-auto text-xs text-slate-400 font-mono flex items-center">
        <Terminal size={12} className="mr-2" /> bash — git
      </div>
    </div>
    <div className="p-4 overflow-x-auto text-sm font-mono text-slate-300">
      {children}
    </div>
  </div>
);

const AsciiBlock = ({ art }) => (
  <div className="w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner my-4 p-4 overflow-x-auto">
    <pre className="text-emerald-400 font-mono text-xs md:text-sm leading-relaxed">
      {art}
    </pre>
  </div>
);

// Block Renderer
const renderBlocks = (blocks) => {
  if (!blocks) return null;
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'text':
        return <p key={i} className="text-slate-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />;
      case 'quote':
        return (
          <blockquote key={i} className="border-l-4 border-blue-500 pl-4 py-2 my-6 text-slate-400 italic bg-slate-900/50 rounded-r-lg">
            {block.content}
          </blockquote>
        );
      case 'alert':
        return (
          <div key={i} className="bg-red-900/20 border border-red-800/50 p-4 rounded-lg text-red-300 my-4 flex gap-3 shadow-sm">
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
            <div className="font-medium text-sm md:text-base leading-relaxed">{block.content}</div>
          </div>
        );
      case 'ascii':
        return <AsciiBlock key={i} art={block.content} />;
      case 'table':
        return (
          <div key={i} className="overflow-x-auto rounded-lg border border-slate-800 mt-6 mb-6 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  {block.headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 font-semibold border-b border-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/30">
                {block.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-3 text-slate-300 align-top ${cIdx === 0 ? 'font-mono text-emerald-400 whitespace-nowrap' : 'leading-relaxed'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'commands':
        return (
          <TerminalWindow key={i}>
            <div className="space-y-4">
              {block.commands.map((cmd, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                  <div className="flex-shrink-0 text-emerald-400">
                    <span className="text-slate-500 mr-2">$</span>
                    {cmd.cmd}
                  </div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 md:mt-0 leading-relaxed">
                    # {cmd.desc}
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        );
      default:
        return null;
    }
  });
};

export default function GitMasterclass() {
  const [activePhase, setActivePhase] = useState(courseData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeData = courseData.find(p => p.id === activePhase);

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex font-sans selection:bg-blue-500/30 text-left overflow-hidden">
      
      {/* Sidebar - Dynamic and responsive! */}
      <div className={`h-full bg-slate-900 flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'w-full md:w-72 border-r border-slate-800' : 'w-0'}`}>
        <div className="w-full md:w-72 h-full flex flex-col min-w-[18rem]">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <GitBranch className="text-blue-500" /> Git Masterclass
            </h1>
            <p className="text-xs text-slate-400 mt-2">The Deep System Architecture</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {courseData.map((phase) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    setActivePhase(phase.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-blue-400" : "text-slate-500"} />
                  <span className="text-sm font-medium leading-tight">{phase.title}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto bg-slate-950 relative">
        
        {/* Top Navigation Bar with the Hamburger Menu */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          {!isSidebarOpen && (
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <GitBranch size={16} className="text-blue-500" /> Git Masterclass
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto p-6 md:p-10 pt-6">
          
          {/* --- NOTION LINK BANNER --- */}
          <a 
            href="https://tinyurl.com/quicknotesgit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-8 bg-blue-900/20 border border-blue-800/50 rounded-xl hover:bg-blue-900/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-blue-300 mb-2 sm:mb-0">
              <BookOpen size={20} className="text-blue-400 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">For full notes, refer to this Notion page</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors">
              View Notion Docs <ExternalLink size={16} />
            </div>
          </a>

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs font-semibold mb-4 border border-blue-800/50">
              <activeData.icon size={14} /> 
              {activeData.title.split(':')[0]}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              {activeData.title.split(':')[1]?.trim() || activeData.title}
            </h2>
            <div className="bg-slate-900 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-slate-300 leading-relaxed flex gap-3">
                <Info className="flex-shrink-0 text-blue-400 mt-1" size={18} />
                {activeData.overview}
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12 pb-12">
            {activeData.sections.map((section, idx) => (
              <div key={idx} className="relative">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm text-slate-400 border border-slate-700">
                    {idx + 1}
                  </span>
                  {section.title}
                </h3>
                
                {/* Dynamically Render all stacked blocks for this section */}
                {renderBlocks(section.blocks)}
                
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}