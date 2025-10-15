import Editor from "./features/Editor/components/Editor/Editor.component"
import { RulesCollapsable } from "./components/Rules/Rules.component"
import { Options } from "./features/Editor/components/Options/Options.component"
import { FalsePositives } from "./components/FalsePositives/FalsePositives.component"
import { BrillPOSTagger, Lexicon, RuleSet } from "natural"

export default function Home() {

  //   const names = `James 	4,545,686 	Mary 	2,913,902
  // 2 	Michael 	4,354,983 	Patricia 	1,539,442
  // 3 	John 	4,254,027 	Jennifer 	1,470,844
  // 4 	Robert 	4,248,470 	Linda 	1,448,119
  // 5 	David 	3,562,294 	Elizabeth 	1,387,113
  // 6 	William 	3,400,779 	Barbara 	1,371,191
  // 7 	Richard 	2,387,091 	Susan 	1,100,642
  // 8 	Joseph 	2,263,825 	Jessica 	1,048,746
  // 9 	Thomas 	2,115,411 	Karen 	986,097
  // 10 	Christopher 	2,059,450 	Sarah 	983,348
  // 11 	Charles 	1,989,647 	Lisa 	965,906
  // 12 	Daniel 	1,913,775 	Nancy 	953,532
  // 13 	Matthew 	1,632,726 	Sandra 	873,340
  // 14 	Anthony 	1,411,666 	Ashley 	857,349
  // Steven
  // 24 	Timothy 	1,077,042 	Deborah 	740,811
  // 25 	Ronald 	1,070,225 	Stephanie 	740,151
  // 26 	Jason 	1,048,271 	Rebecca 	728,579
  // 27 	George 	1,037,090 	Sharon 	720,843
  // 29 	Jeffrey 	978,511 	Cynthia 	705,775
  // 31 	Jacob 	959,832 	Kathleen 	672,182
  // 32 	Nicholas 	902,466 	Angela 	661,416
  // 33 	Gary 	900,286 	Dorothy 	658,259
  // 35 	Jonathan 	865,327 	Emma 	618,298
  // 36 	Stephen 	836,135 	Brenda 	606,313
  // 37 	Larry 	800,777 	Nicole 	593,347

  // 56 	Henry 	553,398 	Lauren 	474,679
  // 57 	Zachary 	549,577 	Kelly 	472,947
  // 58 	Douglas 	542,783 	Christina 	471,370
  // 59 	Peter 	532,119 	Joan 	458,352
  // 60 	Noah 	503,865 	Judith 	449,376
  // 61 	Kyle 	484,179 	Ruth 	448,694
  // 62 	Ethan 	478,323 	Hannah 	446,882
  // 63 	Christian 	447,252 	Evelyn 	445,047
  // 64 	Jeremy 	444,813 	Andrea 	442,601

  // 83 	Billy 	369,190 	Julia 	372,586
  // 84 	Elijah 	363,648 	Grace 	372,014
  // 85 	Joe 	359,301 	Denise 	371,278
  // 86 	Alan 	356,380 	Danielle 	371,135
  // 87 	Juan 	354,980 	Natalie 	368,251
  // 88 	Liam 	336,845 	Alice 	364,227
  // 89 	Willie 	334,370 	Marilyn 	363,919
  // 90 	Mason 	334,123 	Diana 	363,855
  // 91 	Albert 	329,982 	Beverly 	363,089
  // 92 	Randy 	328,839 	Jean 	361,487
  // 93 	Wayne 	328,463 	Brittany 	360,163
  // 98 	Bobby 	311,580 	Tiffany 	338,298
  // 99 	Isaac 	311,345 	Lori 	337,995
  // 100 	Bradley 	311,031 	Kathy 	331,776
  // `

  const novel = `“What are we doing here?” asked Emily. Crowley looked at her as she looked around. “Is this New Mexico?”
  “I need your help with something, Sheep.” “Stop calling me that,” Emily complained.
  “I have a business matter to attend to, and I need you to stand guard.”
  “S- What business? And why-” Emily looked around, a car pulling into a driveway. “What the hell is going on?”
  “Enough with the questions, we are here to work,” Crowley said, walking past her and towards the car. “Just work lookout, I’m sure your father taught you.”
  Emily and Jesse hadn't spoken in three days. Emily avoided him at all costs. eft early, came back late, when he was sleeping. He'd called her a few times, but she didn't want to answer. They kissed. And somehow that was the worst and the best thing to happen to her in a long, long time. It wasn't the same as Kevin. With Kevin there had been anticipation, they knew it was coming, they were just scared. And yeah, being scared was involved with Jesse, too, but it wasn't the same thing. It was almost like that kiss and the sex were two separate things. There was zero amount of sex tension in that kiss. Probably a negative amount. And that was driving Emily insane. She didn't want to see Jesse again. Not until she understood- came to terms with really, that it was a good thing. That it meant she could finally move on. Moving one was all she'd wanted when she decided to move to Alaska, and now that she had it, she didn't know what to do with it. She was hanging out by the lake, hoping for Jesse not to call her, when he, instead, walked up to her from behind a corner.
  “How long are you gonna keep this up?” he asked. Emily pretended not to see him. “You know, if you didn't like it you can just say that, no need to disappear like this.”
  `
  //   const test = tagger.tag(
  //     novel
        // .replaceAll(new RegExp(/[\n,."'’”““?-]/, "gmi"), " ")
        // .split(" ")
        // .filter(Boolean)
  //   )

  //   const a = test.taggedWords
  //     .filter((entry) => entry.tag === "UH" || entry.tag === "RB")
  //     .map((entry) => entry.token)
  //   console.log(a)
  //   const b = Object.groupBy(a, (e) => e.toLocaleLowerCase())
  //   for (const key in b) {
  //     if (!Object.hasOwn(b, key)) continue

  //     const element = b[key]
  //     if (element?.length === 1) continue

  //     if (element?.every((w) => w.at(0) === key.at(0)?.toUpperCase())) {
  //       console.log(key, "is a proper noun for sure")
  //     }
  //   }
  //split
  //pulirlo di tutti i char speciali
  // console.log(test)

  fetch("http://localhost:3000/api", {
    method: "POST",
    body: novel,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((res) => console.log(res))

  return (
    <main className="flex gap-4">
      <div className="editor">
        <header>
          <h1>The Dialogue Thing</h1>
          <p>
            Paste your chapter in the area below ⬇️ and see everything that
            doesn&apos;t match the default dialogue rules.
          </p>
          <small>
            💡 Tip: when pasting back to google docs, use CTRL+SHIFT+V, or
            &quot;Paste without formatting&quot;
          </small>
          <RulesCollapsable />
          <FalsePositives />
        </header>
        <div className="editor__wrap">
          <Editor />
        </div>
      </div>
      <Options />
    </main>
  )
}
