import React from 'react';
import { cn } from '@/lib/utils';
import { BasicInfoData } from './basicinfoform';
import { HealthDetailsData } from './HealthDetailsForm';
import { PreferenceData } from './PreferenceForm';

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

// 方案风格选项
const planStyles = [
  { id: 'disciplined', name: '自律', description: '严格的计划和追踪' },
  { id: 'flexible', name: '灵活佛系', description: '适度放松的计划安排' },
  { id: 'ai', name: 'AI推荐', description: '智能算法动态调整' },
];

interface ReviewFormProps {
  basicInfo: BasicInfoData;
  healthDetails: HealthDetailsData;
  preferences: PreferenceData;
  onBack: () => void;
  onEdit: (step: number) => void;
  onGenerate: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  basicInfo,
  healthDetails,
  preferences,
  onBack,
  onEdit,
  onGenerate
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
        信息确认
      </h2>

      {/* 基础信息部分 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">基础信息</h3>
          <button
            onClick={() => onEdit(1)}
            className="text-orange-400 hover:text-orange-500 transition-colors"
          >
            编辑
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
          <div>
            <span className="text-gray-500">年龄：</span>
            <span>{basicInfo.age}岁</span>
          </div>
          <div>
            <span className="text-gray-500">性别：</span>
            <span>{basicInfo.gender === 'male' ? '男' : '女'}</span>
          </div>
          <div>
            <span className="text-gray-500">身高：</span>
            <span>{basicInfo.height}cm</span>
          </div>
          <div>
            <span className="text-gray-500">体重：</span>
            <span>{basicInfo.weight}kg</span>
          </div>
          <div>
            <span className="text-gray-500">目标：</span>
            <span>{basicInfo.fitnessGoal}</span>
          </div>
        </div>
      </div>

      {/* 健康细节部分 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">健康细节</h3>
          <button
            onClick={() => onEdit(2)}
            className="text-orange-400 hover:text-orange-500 transition-colors"
          >
            编辑
          </button>
        </div>
        <div className="space-y-4 p-4 bg-white/5 rounded-lg">
          <div>
            <h4 className="font-medium mb-2">慢性病/过敏史：</h4>
            <div className="flex flex-wrap gap-2">
              {healthDetails.chronicConditions
                .filter(condition => condition.selected)
                .map(condition => (
                  <span
                    key={condition.id}
                    className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >
                    {condition.name}
                  </span>
                ))}
            </div>
          </div>
          {healthDetails.injuries.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">运动损伤：</h4>
              <div className="space-y-2">
                {healthDetails.injuries.map((injury, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-orange-400">{injury.part}</span>：
                    {injury.description}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">运动频率：</span>
              <span>每周{healthDetails.exerciseFrequency}次</span>
            </div>
            <div>
              <span className="text-gray-500">最大心率：</span>
              <span>{healthDetails.maxHeartRate}次/分</span>
            </div>
            <div>
              <span className="text-gray-500">睡眠质量：</span>
              <span>{healthDetails.sleepQuality}/5</span>
            </div>
            <div>
              <span className="text-gray-500">压力水平：</span>
              <span>{healthDetails.stressLevel}/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* 偏好设置部分 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">偏好设置</h3>
          <button
            onClick={() => onEdit(3)}
            className="text-orange-400 hover:text-orange-500 transition-colors"
          >
            编辑
          </button>
        </div>
        <div className="space-y-4 p-4 bg-white/5 rounded-lg">
          {/* 偏好设置部分 */}
          <div className="space-y-4 p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="font-medium mb-2">不喜欢的运动：</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.dislikedExercises.map((exerciseId) => {
                  const exercise = exerciseTypes.find(e => e.id === exerciseId);
                  return (
                    <span
                      key={exerciseId}
                      className="px-3 py-1 bg-rose-500/20 text-rose-500 rounded-full text-sm"
                    >
                      {exercise?.name || exerciseId}
                    </span>
                  );
                })}
                {preferences.otherExercise && (
                  <span className="px-3 py-1 bg-rose-500/20 text-rose-500 rounded-full text-sm">
                    {preferences.otherExercise}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">可用设备：</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.equipment.map((equipmentId) => {
                  const item = equipmentList.find(e => e.id === equipmentId);
                  return (
                    <span
                      key={equipmentId}
                      className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
                    >
                      {item?.name || equipmentId}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">口味偏好：</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.tasteOrder.map((taste, index) => (
                  <span
                    key={taste.id}
                    className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm"
                  >
                    {index + 1}. {taste.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">食材黑名单：</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.blacklistedIngredients.map((ingredientId) => {
                  const ingredient = ingredientBlacklist.find(i => i.id === ingredientId);
                  return (
                    <span
                      key={ingredientId}
                      className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm"
                    >
                      {ingredient?.name || ingredientId}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">运动计划周期：</span>
                <span>{preferences.exercisePeriod}月</span>
              </div>
              <div>
                <span className="text-gray-500">饮食计划周期：</span>
                <span>{preferences.dietPeriod}月</span>
              </div>
              <div>
                <span className="text-gray-500">方案风格：</span>
                <span>{planStyles.find(s => s.id === preferences.planStyle)?.name || preferences.planStyle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500/10 hover:bg-gray-500/20 rounded-lg transition-colors"
        >
          返回
        </button>
        <button
          onClick={onGenerate}
          className="px-6 py-2 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          生成方案
        </button>
      </div>
    </div>
  );
};