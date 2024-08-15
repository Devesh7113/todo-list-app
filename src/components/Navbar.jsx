const Navbar = () => 
{
    return(
        <nav className="bg-violet-800 text-yellow-50 px-10 py-3 flex justify-between">
            <span className="font-bold text-xl">iTasks</span>
            <ul className="flex gap-8">
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar