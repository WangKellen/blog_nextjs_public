import { useState } from 'react';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ScrollProgress } from '../../components/magicui/scroll-progress';
import { useTheme } from 'next-themes';
import { BasicInfoForm, BasicInfoData } from '@/components/AITrainer/basicinfoform';
import { HealthDetailsForm, HealthDetailsData } from '@/components/AITrainer/HealthDetailsForm';
import { PreferenceForm, PreferenceData } from '@/components/AITrainer/PreferenceForm';
import { ReviewForm } from '@/components/AITrainer/ReviewForm';

function DotPatternBackground() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(2000px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
        glow={false}
      />
    </div>
  );
}

const AITrainerPage = () => {
  const { theme, setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfoData | null>(null);
  const [healthDetails, setHealthDetails] = useState<HealthDetailsData | null>(null);
  const [preferences, setPreferences] = useState<PreferenceData | null>(null);

  const handleBasicInfoSubmit = (data: BasicInfoData) => {
    setBasicInfo(data);
    setCurrentStep(2);
  };

  const handleHealthDetailsSubmit = (data: HealthDetailsData) => {
    setHealthDetails(data);
    setCurrentStep(3);
  };

  const handlePreferencesSubmit = (data: PreferenceData) => {
    setPreferences(data);
    setCurrentStep(4);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleGenerate = () => {
    // 这里处理生成方案的逻辑
    console.log('Generating plan with:', { basicInfo, healthDetails, preferences });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ScrollProgress />
      
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <DotPatternBackground />
      </div>
      
      <div className="fixed top-6 left-6 z-50">
        <Link href="/ai" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回AI实验室
        </Link>
      </div>
      
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            AI健筑师
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            智能生成个性化的健身和饮食计划，助你达成健康目标
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep === step
                    ? "bg-gradient-to-r from-orange-400 to-rose-400 text-white"
                    : currentStep > step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                )}>
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div className={cn(
                    "flex-1 h-1 w-16",
                    currentStep > step
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>基础信息</span>
            <span>健康细节</span>
            <span>偏好设置</span>
            <span>确认信息</span>
          </div>
        </div>

        {/* 表单内容 */}
        {currentStep === 1 && (
          <BasicInfoForm 
            onNext={handleBasicInfoSubmit}
            initialData={basicInfo || undefined}
          />
        )}
        {currentStep === 2 && (
          <HealthDetailsForm 
            onNext={handleHealthDetailsSubmit}
            onBack={() => setCurrentStep(1)}
            age={basicInfo?.age || 0}
            initialData={healthDetails || undefined}
          />
        )}
        {currentStep === 3 && (
          <PreferenceForm
            onNext={handlePreferencesSubmit}
            onBack={() => setCurrentStep(2)}
            initialData={preferences || undefined}
          />
        )}
        {currentStep === 4 && basicInfo && healthDetails && preferences && (
          <ReviewForm
            basicInfo={basicInfo}
            healthDetails={healthDetails}
            preferences={preferences}
            onBack={() => setCurrentStep(3)}
            onEdit={handleEdit}
            onGenerate={handleGenerate}
          />
        )}
      </main>
    </div>
  );
};

export default AITrainerPage;