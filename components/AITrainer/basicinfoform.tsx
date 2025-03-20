import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BasicInfoFormProps {
  onNext: (data: BasicInfoData) => void;
  initialData?: BasicInfoData;
}

export interface BasicInfoData {
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number;
  isMetric: boolean;
  fitnessGoal: 'fat-loss' | 'shaping' | 'muscle-gain';
  intensity: 'mild' | 'balanced' | 'aggressive';
  bodyFat: number | null;
}

const calculateBMI = (height: number, weight: number, isMetric: boolean): number => {
  if (isMetric) {
    return weight / Math.pow(height / 100, 2);
  } else {
    // Convert height from ft to meters and weight from lb to kg
    const heightInM = (height * 0.3048);
    const weightInKg = weight * 0.453592;
    return weightInKg / Math.pow(heightInM, 2);
  }
};

const getBMIStatus = (bmi: number): string => {
  if (bmi < 18.5) return '偏瘦';
  if (bmi < 24) return '理想';
  if (bmi < 28) return '偏重';
  return '肥胖';
};

export const BasicInfoForm = ({ onNext, initialData }: BasicInfoFormProps) => {
  const [formData, setFormData] = useState<BasicInfoData>(initialData || {
    gender: 'male',
    age: 25,
    height: 170,
    weight: 65,
    isMetric: true,
    fitnessGoal: 'shaping',
    intensity: 'balanced',
    bodyFat: null
  });

  const [bmi, setBmi] = useState<number>(0);

  useEffect(() => {
    const newBmi = calculateBMI(formData.height, formData.weight, formData.isMetric);
    setBmi(Math.round(newBmi * 10) / 10);
  }, [formData.height, formData.weight, formData.isMetric]);

  const handleUnitToggle = () => {
    setFormData(prev => {
      if (prev.isMetric) {
        // Convert to imperial
        return {
          ...prev,
          isMetric: false,
          height: Math.round(prev.height / 30.48), // cm to ft
          weight: Math.round(prev.weight * 2.20462) // kg to lb
        };
      } else {
        // Convert to metric
        return {
          ...prev,
          isMetric: true,
          height: Math.round(prev.height * 30.48), // ft to cm
          weight: Math.round(prev.weight / 2.20462) // lb to kg
        };
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 dark:border-white/10 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
        基础信息
      </h2>

      <div className="space-y-6">
        {/* 性别选择 */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
            className={cn(
              "p-6 rounded-xl transition-all duration-300 flex flex-col items-center gap-2",
              formData.gender === 'male'
                ? "bg-blue-500/20 dark:bg-blue-500/20 border-2 border-blue-500/50 text-blue-500 dark:text-blue-500"
                : "bg-white/10 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent hover:bg-white/20 text-gray-800 dark:text-white"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>男性</span>
          </button>

          <button
            onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
            className={cn(
              "p-6 rounded-xl transition-all duration-300 flex flex-col items-center gap-2",
              formData.gender === 'female'
                ? "bg-pink-500/20 dark:bg-pink-500/20 border-2 border-pink-500/50 text-pink-500 dark:text-pink-500"
                : "bg-white/10 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent hover:bg-white/20 text-gray-800 dark:text-white"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>女性</span>
          </button>
        </div>

        {/* 年龄滑块 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">年龄: {formData.age}岁</label>
          <input
            type="range"
            min="15"
            max="80"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* 身高体重输入 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              身高 ({formData.isMetric ? 'cm' : 'ft'})
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              体重 ({formData.isMetric ? 'kg' : 'lb'})
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white transition-colors duration-200"
            />
          </div>
        </div>

        {/* 单位切换 */}
        <div className="flex justify-end">
          <button
            onClick={handleUnitToggle}
            className="text-sm text-orange-400 hover:text-orange-500 transition-colors"
          >
            切换到{formData.isMetric ? '英制' : '公制'}
          </button>
        </div>

        {/* BMI显示 */}
        <div className={cn(
          "p-4 rounded-lg text-center transition-colors",
          bmi < 18.5 ? "bg-blue-500/20 text-blue-500" :
          bmi < 24 ? "bg-green-500/20 text-green-500" :
          bmi < 28 ? "bg-yellow-500/20 text-yellow-500" :
          "bg-red-500/20 text-red-500"
        )}>
          BMI: {bmi} ({getBMIStatus(bmi)})
        </div>

        {/* 健身目标 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">健身目标</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: 'fat-loss' }))}
              className={cn(
                "p-4 rounded-xl transition-all duration-300",
                formData.fitnessGoal === 'fat-loss'
                  ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                  : "bg-white/10 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent hover:bg-white/20 text-gray-800 dark:text-white"
              )}
            >
              减脂
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: 'shaping' }))}
              className={cn(
                "p-4 rounded-xl transition-all duration-300",
                formData.fitnessGoal === 'shaping'
                  ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                  : "bg-white/10 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent hover:bg-white/20 text-gray-800 dark:text-white"
              )}
            >
              塑形
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: 'muscle-gain' }))}
              className={cn(
                "p-4 rounded-xl transition-all duration-300",
                formData.fitnessGoal === 'muscle-gain'
                  ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                  : "bg-white/10 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent hover:bg-white/20 text-gray-800 dark:text-white"
              )}
            >
              增肌
            </button>
          </div>
        </div>

        {/* 强度选择 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">训练强度</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, intensity: 'mild' }))} 
              className={cn(
                "p-4 rounded-xl transition-all duration-300 relative overflow-hidden",
                formData.intensity === 'mild'
                  ? "bg-blue-500/20 border-2 border-blue-500/50 text-blue-500"
                  : "bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10"
              )}
            >
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                formData.intensity === 'mild' ? "opacity-100" : "opacity-0"
              )}>
                <div className="absolute inset-0 bg-blue-500/10 animate-wave" />
              </div>
              <h4 className="text-lg font-semibold mb-2 relative z-10">温和</h4>
              <p className="text-sm opacity-80 relative z-10">适合初学者</p>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, intensity: 'balanced' }))} 
              className={cn(
                "p-4 rounded-xl transition-all duration-300 relative overflow-hidden",
                formData.intensity === 'balanced'
                  ? "bg-green-500/20 border-2 border-green-500/50 text-green-500"
                  : "bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10"
              )}
            >
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                formData.intensity === 'balanced' ? "opacity-100" : "opacity-0"
              )}>
                <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
              </div>
              <h4 className="text-lg font-semibold mb-2 relative z-10">平衡</h4>
              <p className="text-sm opacity-80 relative z-10">稳步提升</p>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, intensity: 'aggressive' }))} 
              className={cn(
                "p-4 rounded-xl transition-all duration-300 relative overflow-hidden",
                formData.intensity === 'aggressive'
                  ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                  : "bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10"
              )}
            >
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                formData.intensity === 'aggressive' ? "opacity-100" : "opacity-0"
              )}>
                <div className="absolute inset-0 bg-orange-500/10 animate-fire" />
              </div>
              <h4 className="text-lg font-semibold mb-2 relative z-10">激进</h4>
              <p className="text-sm opacity-80 relative z-10">快速进阶</p>
            </button>
          </div>
        </div>

        {/* 体脂率（可选） */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">体脂率（可选）</label>
          <input
            type="number"
            value={formData.bodyFat || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, bodyFat: e.target.value ? parseFloat(e.target.value) : null }))}
            placeholder="AI将根据您的BMI进行估算"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
        </div>

        {/* 安全提示 */}
        <div className="flex items-center justify-center text-sm text-green-500 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>您的数据仅用于生成个性化方案，永不共享</span>
        </div>

        {/* 下一步按钮 */}
        <button
          onClick={() => onNext(formData)}
          className="w-full py-3 px-6 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          下一步
        </button>
      </div>
    </div>
  );
};