const castleModal = document.querySelector(".castleModal")
const castleBtn = document.querySelector(".castle")
const mBossBtn = document.querySelector(".mBoss");
const castleModalSea = document.querySelector(".castleModalSea")
const closeSeaBtn = document.querySelector(".closeSeaBtn")
const closeKingBtn = document.querySelector(".closeKingBtn")
const castleModalWeapons = document.querySelector(".castleModalWeapons")
const ammuNation = document.querySelector(".weaponsMap")
const weaponsExitBtn = document.querySelector(".weaponsExit")
// const mBossBtn = document.querySelector(".mBoss");
const fBossBtn = document.querySelector(".fBoss");
castleBtn.addEventListener("click", () => {
    castleModal.showModal();
    mBossBtn.style.opacity = "0"
    fBossBtn.style.opacity = "0"
    castleBtn.style.opacity = "0"
})
closeKingBtn.addEventListener("click", () => {
    castleModal.close();
    mBossBtn.style.opacity = "1"
    fBossBtn.style.opacity = "1"
    castleBtn.style.opacity = "1"
    castleModalSea.close();
})
closeSeaBtn.addEventListener("click", () => {
    castleModal.close();
    mBossBtn.style.opacity = "1"
    fBossBtn.style.opacity = "1"
    castleBtn.style.opacity = "1"
    castleModalSea.close();
})
mBossBtn.addEventListener("click", () => {
    castleModalSea.showModal();
    mBossBtn.style.opacity = "0"
    fBossBtn.style.opacity = "0"
    castleBtn.style.opacity = "0"
})
ammuNation.addEventListener("click", () => {
    castleModalWeapons.showModal();
    mBossBtn.style.opacity = "0"
    fBossBtn.style.opacity = "0"
    castleBtn.style.opacity = "0"
})
weaponsExitBtn.addEventListener("click", () => {
    castleModalWeapons.close();
    mBossBtn.style.opacity = "1"
    fBossBtn.style.opacity = "1"
    castleBtn.style.opacity = "1"
})