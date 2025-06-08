import { useState, useEffect } from "react";

const LoadingScreen = ({ logo, appName = "HR 360" }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Change loading text over time
    const textTimeout1 = setTimeout(
      () => setLoadingText("Initializing..."),
      800
    );
    const textTimeout2 = setTimeout(
      () => setLoadingText("Setting up..."),
      1600
    );
    const textTimeout3 = setTimeout(
      () => setLoadingText("Almost ready..."),
      2400
    );

    return () => {
      clearInterval(progressInterval);
      clearTimeout(textTimeout1);
      clearTimeout(textTimeout2);
      clearTimeout(textTimeout3);
    };
  }, []);

  return (
    <div className='fixed inset-0  flex items-center justify-center z-50'>
      <div className='flex flex-col items-center space-y-8 text-center'>
        {/* Logo with pulse animation */}
        <div className='relative'>
          <div className='absolute inset-0 animate-ping'>
            {logo ? (
              <img
                src={logo}
                alt={`${appName} Logo`}
                className='h-16 w-auto opacity-75'
              />
            ) : (
              <div className='h-16 w-16 bg-primary-orange rounded-2xl opacity-75'></div>
            )}
          </div>
          <div className='relative'>
            {logo ? (
              <img
                src={logo}
                alt={`${appName} Logo`}
                className='h-16 w-auto'
              />
            ) : (
              <div className='h-16 w-16 bg-primary-orange rounded-2xl flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>
                  {appName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* App name */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-gray-900'>{appName}</h1>
          <p className='text-gray-600 animate-pulse'>{loadingText}</p>
        </div>

        {/* Progress bar */}
        <div className='w-64 space-y-2'>
          <div className='w-full bg-gray-200 rounded-full h-1.5 overflow-hidden'>
            <div
              className='bg-gradient-to-r from-primary-orange to-light-orange h-1.5 rounded-full transition-all duration-300 ease-out'
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className='text-xs text-gray-500 text-center'>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Bouncing dots */}
        <div className='flex space-x-2'>
          <div className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Version or additional info */}
        <div className='text-xs text-gray-400 mt-8'>Version 1.0.0</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
