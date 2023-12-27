import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Properties = () => {
    const axiosSecure = useAxios();

    const {refetch, data } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('api/v1/properties');
            console.log(res.data);
            return res.data;
        },
    })
    console.log(data);
    refetch();

    return (
        <div className='max-w-7xl mx-auto mb-32'>
        <p className='text-4xl font-bold text-gray-600 text-center mt-40 mb-20 underline'> Properties </p>
            <Swiper
            // slidesPerView={3}
        spaceBetween={30}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
      >
              { data &&
                data.slice(0,8).map(property => 
        <SwiperSlide key={property._id}>
                    <div className=''>
                    <div className="mb-20 group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
      <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
        <img className="h-52 object-cover w-full" src={property?.image} alt={property?.title}  />
      </div>
      <div className="p-4 md:p-6">

        <h3 className="text-xl font-semibold text-gray-600">
          {property?.title}
        </h3>
        <span className="block mb-1 mt-3 text-xs font-semibold uppercase text-blue-600">
          {property?.location}
        </span>
        <p className="mt-3 text-gray-600">
          {property?.type}
        </p>
        <p className="mt-3 text-gray-600">
          ${property?.price}
        </p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
        <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-600 shadow-sm hover:bg-gray-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none" 
        to={`/properties/${property?._id}`}
        >
          View Details
        </Link>

      </div>
    </div>
                    </div>
        </SwiperSlide>
                )
              }
      </Swiper>
        <div className='flex justify-center'>
        <Link to='/properties'>
        <button className='mt-10 border-b-2 border-b-blue-600 p-2 rounded-md shadow-lg'> View All Properties </button>
        </Link>
        </div>
        </div>
    );
};

export default Properties;