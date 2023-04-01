export const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-[40px] w-full rounded-[5px] border-stroke border-[.5px] bg-gray-300'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full flex justify-center items-center text-white ${
                    progressPercentage < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                        {progressPercentage ===100&&<p>Успешно загружен</p>} 
            </div>
        </div>
    );
};