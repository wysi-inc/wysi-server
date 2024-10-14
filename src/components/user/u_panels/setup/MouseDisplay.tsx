import type { Setup } from "@/src/models/User";
import SetupInput from "./SetupInput";
import { isEmpty } from "@/src/libs/web_utils";
import { txt } from "@/src/tasks/files";

function MouseDisplay(p: {
    mouse: Setup["mouse"],
    editable: boolean,
    lang: string
}) {

    const empty = isEmpty(p.mouse);

    if (!p.editable && empty) return <></>;

    return (<>
        <div class={`${empty ? "block group-has-[:disabled]/setup:hidden" : ""} grid grid-cols-3 rounded-lg bg-base-200`}>
            <div class="center relative flex">
                <h1 class="absolute left-3 top-2">{txt(p.lang, "user.sections.setup.tabs.mouse")}</h1>
                <div class="flex h-36 p-2">
                    <div class="flex grow items-center justify-center">
                        <div class="flex h-full w-20 flex-col justify-between divide-y divide-base-content rounded-full outline outline-1">
                            <div class="relative flex h-2/5 divide-x divide-base-content" >
                                <div class="h-full w-1/2" />
                                <div class="h-full w-1/2" />
                                <div class="absolute left-1/2 top-1/2 h-6 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-base-300 outline outline-1" />
                            </div>
                            <div class="h-3/5" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative col-span-2 flex grow flex-col gap-2 rounded-lg bg-base-300 px-5 py-4">
                <div>
                    <div class="text-xs">{txt(p.lang, "user.sections.setup.name")}:</div>
                    <label class="peer input input-sm input-bordered h-6 w-full py-1 px-2 text-base-content has-[:disabled]:border-0 has-[:disabled]:bg-base-300 has-[:disabled]:p-0">
                        <input id="mouse_name" name="mouse_name" class="h-6 bg-transparent"
                            type="text" placeholder={txt(p.lang, "user.sections.setup.name")} value={p.mouse?.name || ""} />
                    </label>
                </div>
                <div>
                    <div class="text-xs">{txt(p.lang, "user.sections.setup.dpi")}:</div>
                    <div class="flex flex-row gap-2">
                        <div class="w-32">
                            <SetupInput editable={p.editable} id="mouse_dpi" name="DPI" measure="dpi" value={p.mouse?.dpi} type="number" />
                        </div>
                        <div class="w-48">
                            <SetupInput editable={p.editable} id="mouse_x" name={txt(p.lang, "user.sections.setup.mult")} measure="x" value={p.mouse?.mult} type="number" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default MouseDisplay;
