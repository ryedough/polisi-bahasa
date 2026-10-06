export interface Choice {
    text : string,
    correct : boolean,
}
export interface Question {
    text : string,
    choices : [Choice, Choice, Choice, Choice],
    noRightChoice : boolean,
}

export function shuffle<T>(array: [T,T,T,T]): [T,T,T,T] {
    let currentIndex : number = array.length
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};

function createQuestion(text : string,a : string, b : string, c : string, d : string, correct : "a" | "b" | "c" | "d" | null) : Question{
    return {
        text,
        choices : shuffle([
            {text : a, correct : correct == 'a'},
            {text : b, correct : correct == 'b'},
            {text : c, correct : correct == 'c'},
            {text : d, correct : correct == 'd'},
        ]),
        noRightChoice : correct === null,
    }
}

export function getQuestions(n : number) {
  const shuffled = [...masterQuestion];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  // Return the first N elements
  return shuffled.slice(0, n);
}

const masterQuestion : Question[] = [
    createQuestion(
        "Praktek",
        "Praktekh",
        "Prakteg",
        "Praktik",
        "Praktekkan",
        "c"
    ),
    createQuestion(
        "Resiko",
        "Resikho",
        "Riziko",
        "Resikko",
        "Risiko",
        "d"
    ),
    createQuestion(
        "Pada hari Senin, kami mengikuti upacara.",
        "Pada hari senin, kami mengikuti upacara.",
        "Pada Hari Senin, kami mengikuti upacara.",
        "Pada hari senin, Kami mengikuti upacara.",
        "Pada Hari senin, kami mengikuti upacara.",
        null
    ),
    createQuestion(
        "Ia Beragama Islam.",
        "Ia beragama ISLAM.",
        "Ia Beragama islam.",
        "Ia beragama islam.",
        "Ia beragama Islam.",
        "d"
    ),
    createQuestion(
        "Mahasiswa tersebut berdiskusi didalam ruang laboratorium.",
        "Mahasiswa tersebut berdiskusi di-dalam ruang laboratorium.",
        "Mahasiswa tersebut berdiskusi di dalam ruang laboratorium.",
        "Mahasiswa tersebut berdiskusi dalam di ruang laboratorium.",
        "Mahasiswa tersebut berdiskusi di dalamruang laboratorium.",
        "b"
    ),
    createQuestion(
        "Memengaruhi",
        "Mempengaruhi",
        "Mempegaruhi",
        "Mempengarui",
        "Memengaruhii",
        null
    ),
    createQuestion(
        "Kami belajar bahasa Indonesia Di sekolah.",
        "Kami belajar Bahasa Indonesia di sekolah.",
        "Kami belajar bahasa indonesia di sekolah.",
        "Kami belajar bahasa Indonesia di sekolah.",
        "Kami belajar Bahasa indonesia di sekolah.",
        "c"
    ),
    createQuestion(
        "Oleh, karena itu mahasiswa harus lebih teliti dalam mengerjakan tugas.",
        "Oleh karena itu mahasiswa, harus lebih teliti dalam mengerjakan tugas.",
        "Oleh karena, itu mahasiswa harus lebih teliti dalam mengerjakan tugas.",
        "Oleh karena itu mahasiswa harus, lebih teliti dalam mengerjakan tugas.",
        "Oleh karena itu, mahasiswa harus lebih teliti dalam mengerjakan tugas.",
        "d"
    ),
    createQuestion(
        "Para mahasiswa diwajibkan untuk mengikuti kegiatan tersebut.",
        "Para mahasiswa-mahasiswa diwajibkan mengikuti kegiatan tersebut.",
        "Mahasiswa-mahasiswa diwajibkan untuk mengikuti kegiatan tersebut.",
        "Para mahasiswa diwajibkan untuk mengikuti kegiatan tersebut oleh pihak kampus.",
        "Para mahasiswa-mahasiswa diwajibkan untuk mengikuti kegiatan tersebut oleh pihak kampus.",
        null
    ),
    createQuestion(
        "Dokter menghimbau pasien untuk menjaga pola hidup sehat.",
        "Dokter menghimbau kepada pasien untuk menjaga pola hidup sehat.",
        "Dokter meng-himbau pasien untuk menjaga pola hidup sehat.",
        "Dokter mengimbau kepada pasien untuk menjaga pola hidup sehat.",
        "Dokter mengimbau pasien untuk menjaga pola hidup sehat.",
        "d"
    ),
    createQuestion(
        "Meskipun penelitian tersebut memiliki keterbatasan, hasilnya tetap dapat digunakan sebagai referensi.",
        "Meskipun penelitian tersebut memiliki keterbatasan, tetapi namun hasilnya tetap dapat digunakan.",
        "Penelitian tersebut memiliki keterbatasan, meskipun tetapi hasilnya tetap dapat digunakan.",
        "Meskipun penelitian tersebut memiliki keterbatasan tetapi, hasilnya tetap dapat digunakan sebagai referensi.",
        "Meskipun penelitian tersebut memiliki keterbatasan, tetapi hasilnya tetap dapat digunakan sebagai referensi.",
        null
    ),
    createQuestion(
        "Faktor yang memengaruhi kesehatan mental meliputi tekanan akademik, tidur yang kurang, dan mengalami masalah sosial.",
        "Faktor yang memengaruhi kesehatan mental meliputi tekanan akademik, kurang tidur, dan masalah sosial.",
        "Faktor yang memengaruhi kesehatan mental meliputi tekanan akademik, kurangnya tidur, dan mengalami masalah sosial.",
        "Faktor yang memengaruhi kesehatan mental meliputi menekan akademik, kurang tidur, dan masalah sosial.",
        "Faktor yang memengaruhi kesehatan mental meliputi menekan akademik, kurangnya tidur, dan mengalami masalah sosial.",
        "a"
    ),
    createQuestion(
        "Dalam penelitian tersebut, menemukan bahwa kualitas tidur berpengaruh terhadap konsentrasi mahasiswa.",
        "Dalam penelitian tersebut menemukan bahwa kualitas tidur berpengaruh terhadap konsentrasi mahasiswa.",
        "Penelitian tersebut, dalam menemukan bahwa kualitas tidur berpengaruh terhadap konsentrasi mahasiswa.",
        "Penelitian tersebut menemukan bahwa kualitas tidur berpengaruh terhadap konsentrasi mahasiswa.",
        "Dalam penelitian menemukan bahwa kualitas tidur berpengaruh terhadap konsentrasi mahasiswa.",
        "c"
    ),
    createQuestion(
        "Berdasarkan hasil penelitian, menunjukkan adanya peningkatan motivasi belajar siswa.",
        "Hasil penelitian yang telah dilakukan oleh peneliti menunjukkan adanya peningkatan motivasi belajar siswa.",
        "Berdasarkan hasil penelitian yang telah dilakukan oleh peneliti menunjukkan adanya peningkatan motivasi belajar siswa.",
        "Hasil penelitian, yang telah dilakukan oleh peneliti menunjukkan adanya peningkatan motivasi belajar siswa.",
        "Berdasarkan hasil penelitian yang dilakukan peneliti, menunjukkan adanya peningkatan motivasi belajar siswa.",
        "a"
    ),
    createQuestion(
        "Berdasarkan uraian di atas, maka kesimpulannya adalah bahwa penggunaan media sosial yang berlebihan dapat menyebabkan terganggunya kualitas tidur pada remaja.",
        "Berdasarkan uraian di atas, maka dapat disimpulkan bahwa penggunaan media sosial yang berlebihan dapat menyebabkan terganggunya kualitas tidur pada remaja.",
        "Berdasarkan uraian di atas dapat disimpulkan bahwa penggunaan media sosial yang berlebihan dapat menyebabkan terganggunya kualitas tidur pada remaja.",
        "Uraian di atas, maka dapat disimpulkan bahwa penggunaan media sosial yang berlebihan menyebabkan terganggunya kualitas tidur pada remaja.",
        "Berdasarkan uraian di atas maka dapat disimpulkan bahwa penggunaan media sosial yang berlebihan dapat menyebabkan terganggunya kualitas tidur pada remaja.",
        "b"
    ),
];
