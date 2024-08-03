# Translations
If you want to help translating the site there is a [crowdin](https://crowdin.com/project/wysi) 
project with all the words to translate, contribute there and it will get added whenever i have time :P

If your language is not on the list, DM me and i'll add it

# Contribute
## Prerequisites
- bun
- mongodb
- osu api v2 key

## Setup
Create `.env` file from `.example.env`:
```sh
cp .example.env .env
```
then change the dummy values in `.env` to your real ones. (CROWDIN and KOFI are not needed to run the project)

## Run the project

To install dependencies:
```sh
bun install
```

To run there is 2 scripts:
```sh
bun run dev # runs the project
bun run css # regenerates the css for tailwind
```
you need to be running both scripts.

## Guidelines
Only a couple things here:

*(some of this i haven't been following myself but lets try to do it from now on)*

### File Structure
- All exportable types should be defined in `src/types/...ts`.
- Every page in the website will have its own folder like `src/components/page/Page.ts`.
- If you need to add translations DONT, its a pain and will change whenever i figure out a better way to handle this, so just hard code it in english for now
- Althoug using tailwindcss is the prefered way of styling the site if you need to use manual css please do so on the `main_in.css` file, as the `main_out.css` is autogenerated by tailwind and will be overwritten.

### Code
- Every component should start with Uppercase both the file and the function definition.
- Type `;` youself, js auto semicolon insertion can go f**k itself :heart:;
- Please use 4 space tab inentation :pray:.
- Try to use verbose variable names so documentation is not needed to unserstand the code
- `type` is prefered over `interface`.

Components should use the `function(){}` syntax and not `() => {}`.
It would look something like this:
```tsx
function Example(p: { a: string, b: number, c: Something<T> }) {
    return (<>
        <div>
            {a} and {b}
        </div>
    </>);
}

export default Example;
```

Props type should be defined on the arguments itself, unless either the type needs to be
exported or its extremly complex (20+ values) in which it can also be defined elsewhere:
```tsx
type SomeType = {
    a: string, 
    b: number, 
    c: Something<T> 
};

function Example(p: SomeType) {
    return (<>
        <div>
            {a} and {b}
        </div>
    </>);
}

export default Example;
```

notice that all component returns are structured with `(<></>)` unless its a oneline 
component `<></>` is prefered. 
