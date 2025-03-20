import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { RainbowButton } from '../magicui/rainbow-button';

interface PreferenceFormProps {
  onNext: (data: PreferenceData) => void;
  onBack: () => void;
  initialData?: PreferenceData;
}

export interface PreferenceData {
  dislikedExercises: string[];
  otherExercise: string;
  equipment: string[];
  tasteOrder: typeof tastePreferences;
  blacklistedIngredients: string[];
  exercisePeriod: number;
  dietPeriod: number;
  planStyle: string;
}

// 运动类型选项
const exerciseTypes = [
  { id: 'running', name: '跑步', icon: '🏃‍♂️' },
  { id: 'swimming', name: '游泳', icon: '🏊‍♂️' },
  { id: 'cycling', name: '骑行', icon: '🚴‍♂️' },
  { id: 'yoga', name: '瑜伽', icon: '🧘‍♂️' },
  { id: 'weightlifting', name: '举重', icon: '🏋️‍♂️' },
  { id: 'boxing', name: '拳击', icon: '🥊' },
  { id: 'dancing', name: '舞蹈', icon: '💃' },
  { id: 'basketball', name: '篮球', icon: '🏀' },
];

// 设备选项
const equipmentList = [
  { id: 'dumbbell', name: '哑铃' },
  { id: 'jumpRope', name: '跳绳' },
  { id: 'gymMembership', name: '健身房会员' },
  { id: 'yogaMat', name: '瑜伽垫' },
  { id: 'resistanceBand', name: '弹力带' },
  { id: 'foamRoller', name: '泡沫轴' },
  { id: 'pullUpBar', name: '引体向上杆' },
  { id: 'treadmill', name: '跑步机' },
];

// 食材黑名单选项
const ingredientBlacklist = [
  { id: 'coriander', name: '香菜', icon: '🌿' },
  { id: 'mushroom', name: '蘑菇', icon: '🍄' },
  { id: 'celery', name: '芹菜', icon: '🥬' },
  { id: 'seafood', name: '海鲜', icon: '🦐' },
  { id: 'bitterGourd', name: '苦瓜', icon: '🥒' },
  { id: 'liver', name: '动物内脏', icon: '🍖' },
  { id: 'durian', name: '洋葱', icon: '🧅' },
  { id: 'spicy', name: '辛辣食物', icon: '🌶️' },
];

// 口味选项
const tastePreferences = [
  { id: 'sweet', name: '甜', icon: '🍯' },
  { id: 'salty', name: '咸', icon: '🧂' },
  { id: 'spicy', name: '辣', icon: '🌶️' },
  { id: 'sour', name: '酸', icon: '🍋' },
  { id: 'bitter', name: '苦', icon: '☕' },
];

// 方案风格选项
const planStyles = [
  { id: 'disciplined', name: '自律', description: '严格的计划和追踪' },
  { id: 'flexible', name: '灵活佛系', description: '适度放松的计划安排' },
  { id: 'ai', name: 'AI推荐', description: '智能算法动态调整' },
];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ onNext, onBack, initialData }) => {
  // 状态管理
  const [dislikedExercises, setDislikedExercises] = useState<string[]>(initialData?.dislikedExercises || []);
  const [otherExercise, setOtherExercise] = useState(initialData?.otherExercise || '');
  const [equipment, setEquipment] = useState<string[]>(initialData?.equipment || []);
  const [tasteOrder, setTasteOrder] = useState(initialData?.tasteOrder || tastePreferences);
  const [blacklistedIngredients, setBlacklistedIngredients] = useState<string[]>(initialData?.blacklistedIngredients || []);
  const [exercisePeriod, setExercisePeriod] = useState(initialData?.exercisePeriod || 3);
  const [dietPeriod, setDietPeriod] = useState(initialData?.dietPeriod || 3);
  const [planStyle, setPlanStyle] = useState(initialData?.planStyle || 'ai');
  const [otherBlacklistedIngredient, setOtherBlacklistedIngredient] = useState('');

  // 处理运动类型选择
  const handleExerciseToggle = (id: string) => {
    setDislikedExercises(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 处理设备选择
  const handleEquipmentToggle = (id: string) => {
    setEquipment(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 处理口味排序
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasteOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasteOrder(items);
  };

  // 处理食材黑名单选择
  const handleIngredientToggle = (id: string) => {
    setBlacklistedIngredients(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 处理自定义食材黑名单添加
  const handleAddBlacklistedIngredient = () => {
    if (otherBlacklistedIngredient.trim()) {
      const newIngredient = {
        id: `custom-${Date.now()}`,
        name: otherBlacklistedIngredient.trim(),
        icon: '🍽️'
      };
      setBlacklistedIngredients(prev => [...prev, newIngredient.id]);
      ingredientBlacklist.push(newIngredient);
      setOtherBlacklistedIngredient('');
    }
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: PreferenceData = {
      dislikedExercises,
      otherExercise,
      equipment,
      tasteOrder,
      blacklistedIngredients,
      exercisePeriod,
      dietPeriod,
      planStyle,
    };
    console.log('Preference Data:', formData);
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl">
      {/* 运动类型选择 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">厌恶的运动类型</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {exerciseTypes.map((exercise) => (
            <button
              key={exercise.id}
              type="button"
              onClick={() => handleExerciseToggle(exercise.id)}
              className={`p-4 rounded-xl transition-all ${dislikedExercises.includes(exercise.id)
                ? 'bg-rose-500 text-white'
                : 'bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10'}`}
            >
              <span className="text-2xl mb-2">{exercise.icon}</span>
              <p className="text-sm">{exercise.name}</p>
            </button>
          ))}
        </div>
        <input
          type="text"
          value={otherExercise}
          onChange={(e) => setOtherExercise(e.target.value)}
          placeholder="其他不喜欢的运动..."
          className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
        />
      </div>

      {/* 设备可用性 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">可用设备</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {equipmentList.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleEquipmentToggle(item.id)}
              className={`p-4 rounded-xl transition-all ${equipment.includes(item.id)
                ? 'bg-green-500 text-white'
                : 'bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10'}`}
            >
              <p className="text-sm">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 饮食口味排序 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">口味偏好排序</h3>
        <Reorder.Group
          axis="y"
          values={tasteOrder}
          onReorder={setTasteOrder}
          className="space-y-2"
        >
          {tasteOrder.map((taste) => (
            <Reorder.Item
              key={taste.id}
              value={taste}
              className="flex items-center gap-4 p-4 bg-white/10 dark:bg-white/5 rounded-xl cursor-move"
              whileDrag={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                background: "rgba(255,255,255,0.2)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <span className="text-xl select-none">{taste.icon}</span>
              <span className="text-gray-800 dark:text-white select-none">{taste.name}</span>
              <div className="flex-grow" />
              <span className="text-gray-500 select-none">#{tasteOrder.indexOf(taste) + 1}</span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* 食材黑名单 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">食材黑名单</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ingredientBlacklist.map((ingredient) => (
            <button
              key={ingredient.id}
              type="button"
              onClick={() => handleIngredientToggle(ingredient.id)}
              className={`p-4 rounded-xl transition-all ${blacklistedIngredients.includes(ingredient.id)
                ? 'bg-rose-500 text-white'
                : 'bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10'}`}
            >
              <span className="text-2xl mb-2 select-none">{ingredient.icon}</span>
              <p className="text-sm select-none">{ingredient.name}</p>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={otherBlacklistedIngredient}
            onChange={(e) => setOtherBlacklistedIngredient(e.target.value)}
            placeholder="添加其他不喜欢的食材..."
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
          />
          <button
            type="button"
            onClick={handleAddBlacklistedIngredient}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            添加
          </button>
        </div>
      </div>

      {/* 计划周期设置 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">运动计划周期</h3>
          <div className="flex items-center justify-center p-4 bg-white/10 dark:bg-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => setExercisePeriod(prev => Math.max(1, prev - 1))}
              className="p-2 text-2xl text-gray-800 dark:text-white hover:text-orange-500"
            >
              -
            </button>
            <span className="mx-8 text-3xl font-bold text-gray-800 dark:text-white">
              {exercisePeriod}
            </span>
            <button
              type="button"
              onClick={() => setExercisePeriod(prev => Math.min(12, prev + 1))}
              className="p-2 text-2xl text-gray-800 dark:text-white hover:text-orange-500"
            >
              +
            </button>
            <span className="ml-4 text-gray-600 dark:text-gray-400">月</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">饮食计划周期</h3>
          <div className="flex items-center justify-center p-4 bg-white/10 dark:bg-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => setDietPeriod(prev => Math.max(1, prev - 1))}
              className="p-2 text-2xl text-gray-800 dark:text-white hover:text-orange-500"
            >
              -
            </button>
            <span className="mx-8 text-3xl font-bold text-gray-800 dark:text-white">
              {dietPeriod}
            </span>
            <button
              type="button"
              onClick={() => setDietPeriod(prev => Math.min(12, prev + 1))}
              className="p-2 text-2xl text-gray-800 dark:text-white hover:text-orange-500"
            >
              +
            </button>
            <span className="ml-4 text-gray-600 dark:text-gray-400">月</span>
          </div>
        </div>
      </div>

      {/* 方案风格选择 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">方案风格</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {planStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setPlanStyle(style.id)}
              className={`p-4 rounded-xl transition-all ${planStyle === style.id
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white'
                : 'bg-white/10 dark:bg-white/10 hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10'}`}
            >
              <h4 className="text-lg font-semibold mb-2">{style.name}</h4>
              <p className="text-sm opacity-80">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-8 space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            上一步
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-rose-400 text-white hover:from-orange-500 hover:to-rose-500 transition-colors duration-200"
          >
            下一步
          </button>
      </div>
    </form>
  );
};