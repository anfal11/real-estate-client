import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

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
        <div className='max-w-7xl mx-auto'>
        <p className='text-2xl font-bold text-center mt-20 mb-10'> Latest Properties </p>
            <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
      >
              { data &&
                data.map(property => 
        <SwiperSlide key={property._id}>
                    <div className=''>
                    <div className="mb-10 group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl ">
      <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
        <img className="w-24 h-24 rounded-full" src={property?.image} alt={`${property?.title} - Property Image`}  />
      </div>
      <div className="p-4 md:p-6">

        <h3 className="text-xl font-semibold text-gray-800">
          {property?.title}
        </h3>
        <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
          {property?.location}
        </span>
        <p className="mt-3 text-gray-500">
          {property?.type}
        </p>
        <p className="mt-3 text-gray-500">
          ${property?.price}
        </p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
        <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
          View Details
        </a>

      </div>
    </div>
                    </div>
        </SwiperSlide>
                )
              }
      </Swiper>
        </div>
    );
};

export default Properties;