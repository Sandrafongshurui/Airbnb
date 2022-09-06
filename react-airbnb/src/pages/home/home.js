import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import ListListings from "../../components/list-listings/List-listings";
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    return (
    <div className={'container-fluid p-0'}>
        <SiteHeader />

        <div className={'container-xxl mt-4'}>
            <ListListings />
        </div>

        <Footer />

    </div>
    )
}
export default Home;