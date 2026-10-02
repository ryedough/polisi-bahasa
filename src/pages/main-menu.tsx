import BgImg from "../assets/mainbg.jpg"
import Title from "../assets/title.png"
import Cop from "../assets/cop-title.png"

export const MainMenu = () => {
    return <div class="flex flex-col h-full bg-blue-300 relative">
        <div class="absolute w-full h-full z-0 overflow-hidden pointer-events-none">
            <div class="z-1 bg-black opacity-20 w-full h-full absolute"></div>
            <img class="z-0 object-cover w-full h-full" src={BgImg} alt="" />
        </div>
        <div class="flex gap-10 flex-col relative z-1 items-center">
            <img src={Title} alt="" />
            <div class="relative bg-blue-500/75 font-medium text-yellow-300 border-yellow-300 rounded-lg p-2 pb-24 w-3/4 border-2 overflow-hidden">
                <div>
                    Banyak pelanggaran bahasa ditemukan! Jadilah polisi bahasa dan tangkap kesalahannya.
                </div>
                <img src={Cop} alt="" class="absolute bottom-0 right-0 w-28" />
            </div>
            <div class="flex gap-2 flex-col items-center">
                <button class="bg-blue-500 text-yellow-300 border-7 border-yellow-300 w-min p-3 text-3xl font-bold rounded-full transform hover:scale-110 cursor-pointer transition-all">Mulai</button>
            </div>
        </div>
    </div>
}
