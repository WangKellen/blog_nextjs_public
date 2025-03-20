import { useState } from 'react';
import { cn } from '@/lib/utils';
import BodyMap, { bodyPartNames } from './BodyMap';

interface HealthDetailsFormProps {
  onNext: (data: HealthDetailsData) => void;
  onBack: () => void;
  age: number; // 用于计算最大心率
  initialData?: HealthDetailsData;
}

interface ChronicCondition {
  id: string;
  name: string;
  selected: boolean;
}

interface InjuryPoint {
  part: string;
  description: string;
}

interface DietaryRestriction {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export interface HealthDetailsData {
  chronicConditions: ChronicCondition[];
  otherConditions: string;
  injuries: InjuryPoint[];
  exerciseFrequency: number;
  maxHeartRate: number;
  dietaryRestrictions: DietaryRestriction[];
  customDietaryRestrictions: string[];
  cookingAbility: 'beginner' | 'intermediate' | 'advanced';
  sleepQuality: number;
  stressLevel: number;
  medicalReport?: File;
}

const defaultChronicConditions: ChronicCondition[] = [
  { id: 'diabetes', name: '糖尿病', selected: false },
  { id: 'hypertension', name: '高血压', selected: false },
  { id: 'seafood-allergy', name: '海鲜过敏', selected: false },
  { id: 'heart-disease', name: '心脏病', selected: false },
  { id: 'asthma', name: '哮喘', selected: false },
];

const defaultDietaryRestrictions: DietaryRestriction[] = [
  { id: 'halal', name: '清真', icon: '🌙', selected: false },
  { id: 'vegetarian', name: '素食', icon: '🥬', selected: false },
  { id: 'gluten-free', name: '无麸质', icon: '🌾', selected: false },
  { id: 'lactose-free', name: '无乳糖', icon: '🥛', selected: false },
];

export const HealthDetailsForm = ({ onNext, onBack, age, initialData }: HealthDetailsFormProps) => {
  const [formData, setFormData] = useState<HealthDetailsData>(initialData || {
    chronicConditions: defaultChronicConditions,
    otherConditions: '',
    injuries: [],
    exerciseFrequency: 2,
    maxHeartRate: 220 - age,
    dietaryRestrictions: defaultDietaryRestrictions,
    customDietaryRestrictions: [],
    cookingAbility: 'beginner',
    sleepQuality: 3,
    stressLevel: 3,
  });

  const [showHeartRateInfo, setShowHeartRateInfo] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [showInjuryForm, setShowInjuryForm] = useState(false);
  const [injuryDescription, setInjuryDescription] = useState('');
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [injuryDescriptions, setInjuryDescriptions] = useState<{[key: string]: string}>({});

  const handleBodyPartSelect = (part: string) => {
    if (!selectedParts.includes(part)) {
      setSelectedParts(prev => [...prev, part]);
      setInjuryDescriptions(prev => ({ ...prev, [part]: '' }));
    } else {
      setSelectedParts(prev => prev.filter(p => p !== part));
      setInjuryDescriptions(prev => {
        const newDescriptions = { ...prev };
        delete newDescriptions[part];
        return newDescriptions;
      });
    }
  };

  const handleInjuryDescriptionChange = (part: string, description: string) => {
    setInjuryDescriptions(prev => ({
      ...prev,
      [part]: description
    }));
  };

  const handleInjurySubmit = (part: string) => {
    if (injuryDescriptions[part]) {
      handleInjuryAdd(part, injuryDescriptions[part]);
      setSelectedParts(prev => prev.filter(p => p !== part));
      setInjuryDescriptions(prev => {
        const newDescriptions = { ...prev };
        delete newDescriptions[part];
        return newDescriptions;
      });
    }
  };
  const handleChronicConditionToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.map(condition =>
        condition.id === id ? { ...condition, selected: !condition.selected } : condition
      ),
    }));
  };

  const handleDietaryRestrictionToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.map(restriction =>
        restriction.id === id ? { ...restriction, selected: !restriction.selected } : restriction
      ),
    }));
  };

  const handleAddCustomDietaryRestriction = (value: string) => {
    if (value && !formData.customDietaryRestrictions.includes(value)) {
      setFormData(prev => ({
        ...prev,
        customDietaryRestrictions: [...prev.customDietaryRestrictions, value],
      }));
    }
  };

  const handleInjuryAdd = (part: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      injuries: [...prev.injuries, { part, description }],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 dark:border-white/10 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
        健康细节
      </h2>

      <div className="space-y-6">
        {/* 慢性病/过敏史 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">慢性病/过敏史</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {formData.chronicConditions.map(condition => (
              <button
                key={condition.id}
                onClick={() => handleChronicConditionToggle(condition.id)}
                className={cn(
                  "p-3 rounded-lg transition-all duration-300",
                  condition.selected
                    ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                    : "bg-white/5 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent text-gray-800 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
                )}
              >
                {condition.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="其他健康状况（选填）"
            value={formData.otherConditions}
            onChange={(e) => setFormData(prev => ({ ...prev, otherConditions: e.target.value }))}
            className="w-full px-4 py-2 bg-white/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white"
          />
        </div>

        {/* 运动损伤史 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">运动损伤史</label>
          <div className="relative w-full h-[300px] bg-white/5 rounded-lg border border-white/10 overflow-hidden p-4">
            <BodyMap
              onSelectBodyPart={handleBodyPartSelect}
              selectedParts={selectedParts}
            />
          </div>
          
          {selectedParts.length > 0 && (
            <div className="space-y-4">
              {selectedParts.map(part => (
                <div key={part} className="space-y-3 p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">选中部位：<span className="text-orange-400">{bodyPartNames[part]}</span></span>
                    <button
                      onClick={() => handleBodyPartSelect(part)}
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="描述损伤情况"
                      value={injuryDescriptions[part] || ''}
                      onChange={(e) => handleInjuryDescriptionChange(part, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleInjurySubmit(part);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleInjurySubmit(part)}
                      className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors"
                    >
                      添加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {formData.injuries.map((injury, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
              >
                {bodyPartNames[injury.part]}: {injury.description}
              </div>
            ))}
          </div>
        </div>

        {/* 运动频率 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">运动频率</label>
          <div className="relative pt-1">
            <input
              type="range"
              min="1"
              max="5"
              value={formData.exerciseFrequency}
              onChange={(e) => setFormData(prev => ({ ...prev, exerciseFrequency: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gradient-to-r from-orange-400 to-rose-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>几乎不运动</span>
              <span>偶尔运动</span>
              <span>每周1-2次</span>
              <span>每周3-4次</span>
              <span>每天训练</span>
            </div>
          </div>
        </div>

        {/* 最大心率 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium">最大心率</label>
            <button
              onClick={() => setShowHeartRateInfo(!showHeartRateInfo)}
              className="text-orange-400 hover:text-orange-500"
            >
              ?
            </button>
          </div>
          {showHeartRateInfo && (
            <div className="p-4 bg-orange-500/10 rounded-lg text-sm">
              最大心率计算公式：220 - 年龄 = {formData.maxHeartRate} bpm
            </div>
          )}
        </div>

        {/* 宗教/文化禁忌 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">饮食限制</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {formData.dietaryRestrictions.map(restriction => (
              <button
                key={restriction.id}
                onClick={() => handleDietaryRestrictionToggle(restriction.id)}
                className={cn(
                  "p-3 rounded-lg transition-all duration-300 flex items-center gap-2",
                  restriction.selected
                    ? "bg-orange-500/20 border-2 border-orange-500/50 text-orange-500"
                    : "bg-white/5 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent text-gray-800 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
                )}
              >
                <span className="text-xl">{restriction.icon}</span>
                <span>{restriction.name}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="添加自定义饮食限制"
              className="flex-1 px-4 py-2 bg-white/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomDietaryRestriction((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.customDietaryRestrictions.map((restriction, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
              >
                {restriction}
              </div>
            ))}
          </div>
        </div>

        {/* 烹饪条件 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">烹饪条件</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setFormData(prev => ({ ...prev, cookingAbility: 'beginner' }))}
              className={cn(
                "p-4 rounded-lg transition-all duration-300 flex flex-col items-center gap-2",
                formData.cookingAbility === 'beginner'
                  ? "bg-blue-500/20 border-2 border-blue-500/50 text-blue-500"
                  : "bg-white/5 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent text-gray-800 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
              )}
            >
              <span className="text-2xl">🥡</span>
              <span>外卖党</span>
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, cookingAbility: 'intermediate' }))}
              className={cn(
                "p-4 rounded-lg transition-all duration-300 flex flex-col items-center gap-2",
                formData.cookingAbility === 'intermediate'
                  ? "bg-green-500/20 border-2 border-green-500/50 text-green-500"
                  : "bg-white/5 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent text-gray-800 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
              )}
            >
              <span className="text-2xl">🍳</span>
              <span>厨房新手</span>
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, cookingAbility: 'advanced' }))}
              className={cn(
                "p-4 rounded-lg transition-all duration-300 flex flex-col items-center gap-2",
                formData.cookingAbility === 'advanced'
                  ? "bg-purple-500/20 border-2 border-purple-500/50 text-purple-500"
                  : "bg-white/5 dark:bg-white/5 border-2 border-gray-300 dark:border-transparent text-gray-800 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
              )}
            >
              <span className="text-2xl">👨‍🍳</span>
              <span>备餐达人</span>
            </button>
          </div>
        </div>

        {/* 睡眠质量和压力水平 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium">睡眠质量</label>
            <div className="relative pt-1">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.sleepQuality}
                onChange={(e) => setFormData(prev => ({ ...prev, sleepQuality: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gradient-to-r from-green-400 to-red-400 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-2xl mt-2">
                {['😴', '😊', '😐', '😫', '😢'].map((emoji, index) => (
                  <span
                    key={index}
                    className={cn(
                      "transition-all duration-300",
                      formData.sleepQuality === index + 1 ? "transform scale-125" : "opacity-50"
                    )}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">压力水平</label>
            <div className="relative pt-1">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.stressLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gradient-to-r from-green-400 to-red-400 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-2xl mt-2">
                {['😌', '🙂', '😐', '😰', '😭'].map((emoji, index) => (
                  <span
                    key={index}
                    className={cn(
                      "transition-all duration-300",
                      formData.stressLevel === index + 1 ? "transform scale-125" : "opacity-50"
                    )}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 体检报告上传 */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">体检报告（选填）</label>
          <div className="relative w-full h-32 border-2 border-dashed border-white/20 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors">
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData(prev => ({ ...prev, medicalReport: file }));
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>点击或拖拽上传PDF/图片</span>
              <span className="text-xs mt-1">AI将自动提取关键指标</span>
            </div>
            {formData.medicalReport && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-green-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{formData.medicalReport.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-300"
          >
            返回上一步
          </button>
          
          <button
            onClick={() => onNext(formData)}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
};