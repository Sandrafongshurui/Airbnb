import Footer from "../../components/partials/footer/Footer";
import ListListings from "../../components/list-listings/List-listings";

function Home() {
    
    return (
    <div className={'container-fluid p-0'}>

        <div className={'container-xxl mt-4'}>
            <ListListings isHost={ false }/>
        </div>

        <Footer />

    </div>
    )
}
export default Home;