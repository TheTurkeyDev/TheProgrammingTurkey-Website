import React from 'react';

import { PageWrapper } from '../base/page-wrapper';

export function HeadCrumbs() {
    return (
        <PageWrapper>
            <div className="text-center mr-5 ml-5">
                <h1 className="mt-2">Headcrumbs</h1>
                <h3> Minecraft Mod </h3>
                <p>
                    Headcrumbs is a mod intially written and maintained by
                    gamnymedes01. I took over maintaining the mod in early 2017.
                    Since then I have been porting the mod to newer versions and
                    imporiving the code. I have not really added any new
                    features do to lack of time and wanting to keep the mod in
                    it's current state since it isn't my project and vision.
                </p>
                <p>
                    The mod mainly adds both enemy entities that are skinned
                    with various player skins as well as additional mobs heads
                    that can drop from their respective mobs.
                </p>
                <div>
                    <a
                        className="mr-1"
                        href="https://www.curseforge.com/minecraft/mc-mods/headcrumbs"
                    >
                        Info Page and Download
                    </a>
                    |
                    <a
                        className="ml-1"
                        href="https://github.com/ganymedes01/Headcrumbs"
                    >
                        Source Code
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
}
