import Search from "./Search";

const Navbar = () => {
    return (
        <nav class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
            <div class="navbar-start">
                <div class="dropdown">
                    <button tabindex="0" role="button" class="btn btn-ghost btn-circle flex items-center justify-center">
                        <i class="fa-solid fa-bars fa-lg" />
                    </button>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a hx-target="#main" hx-push-url="true" hx-post="/" >Home</a></li>
                        <li><a hx-target="#main" hx-push-url="true" hx-post="/rankings" >Rankings</a></li>
                        <li><a hx-target="#main" hx-push-url="true" hx-post="/beatmaps" >Beatmaps</a></li>
                    </ul>
                </div>
                <a class="btn btn-ghost text-xl">wysi</a>
            </div>
            <div class="navbar-center">
                <Search />
            </div>
            <div class="navbar-end">
                <a href="https://github.com/wysi-inc" target="_blank" class="btn btn-ghost btn-circle">
                    <i class="fa-brands fa-github fa-lg" />
                </a>
                <a href="https://discord.gg/QYVxgS2934" target="_blank" class="btn btn-ghost btn-circle">
                    <i class="fa-brands fa-discord" />
                </a>
                <button class="btn btn-secondary">
                    login with osu!
                </button>
            </div>
        </nav>
    );
}
export default Navbar;
