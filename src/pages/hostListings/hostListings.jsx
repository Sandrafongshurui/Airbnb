import ListListings from "../../components/list-listings/List-listings";
import Footer from "../../components/partials/footer/Footer";
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

function HostListings() {
    const navigate = useNavigate();
    
    return (
    <div className={'container-fluid p-0'}>

        <div className={'container-xxl mt-4'}>
        
            <div className={'mt-2'}>
                <Button onClick={() => navigate('/users/my/listings/create')}>Create</Button>
            </div>

            <ListListings isHost={ true }/>

        </div>

        <Footer />

    </div>
    )
}
export default HostListings;