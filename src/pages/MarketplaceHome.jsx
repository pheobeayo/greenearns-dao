import UseGetAllProduct from '../Hooks/UseGetAllProduct';
import { formatUnits } from 'ethers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';

const MarketplaceHome = () => {
    const allProduct = UseGetAllProduct();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Use media query to detect screen size
    const isMobile = useMediaQuery('(max-width: 640px)');
    const itemsPerPage = isMobile ? 2 : 6;

    useEffect(() => {
        if (allProduct.length > 0) {
            setIsLoading(false);
        }
    }, [allProduct]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = allProduct.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='lg:w-[90%] md:w-[90%] w-[100%] mx-auto py-12 px-4 lg:px-0 md:px-0'>
            {isLoading ? (
                <div className='text-black'><LoadingSpinner /> Loading...</div>
            ) : (
                <>
                    <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center flex-wrap'>
                        {displayedProducts.map((info) => (
                            <div className='lg:w-[32%] md:w-[32%] w-[100%] p-4 border border-[#0F160F]/20 rounded-lg mb-4 shadow-lg' key={info.id}>
                                <Link to={`/marketplace/${info.id}`} className='text-[#0F160F]'>
                                    <img src={info.image} alt="" className='w-[100%] h-[237px] object-cover object-center rounded-lg' />
                                    <h3 className='font-bold mt-4 lg:text-[20px] md:text-[20px] text-[18px] capitalise font-titiliumweb'>{info.name}</h3>
                                    <p className='flex justify-between my-4'>Quantity <span>{Number(info.weight)}</span></p>
                                    <p className='flex justify-between my-4'>Seller &apos;s location <span>{info.location}</span></p>
                                    <p className='flex justify-between my-4 font-bold'>Price <span>{formatUnits(info.price)} AMB</span></p>
                                    <button className='my-4 border w-[100%] py-2 px-4 border-[#427142] bg-white text-[##427142] rounded-lg'>View details</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        count={Math.ceil(allProduct.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        className="mt-4 flex justify-center"
                    />
                </>
            )}
        </div>
    );
}

export default MarketplaceHome;