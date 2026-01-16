import { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../api/ai.api';
import Button from '../components/common/Button';
import ErrorBanner from '../components/common/ErrorBanner';

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Intelligent AI response generator - provides specific, actionable solutions
  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    
    const getIntentResponse = () => {
      // Sleep-related questions
      if (msg.includes('sleep') || msg.includes('tired') || msg.includes('insomnia') || msg.includes('rest')) {
        if (msg.includes("can't sleep") || msg.includes('trouble sleeping') || msg.includes('insomnia')) {
          return "Oh man, insomnia is rough. I've got some real solutions that work. So here's the thing - your body's internal clock is probably off. The best fix? Set a strict schedule starting tonight. Go to bed at 10:30 PM and wake up at 6:30 AM, every single day including weekends. Yes, it's tough the first week, but by week 2 your body will thank you.\n\nRight now, stop using your phone 30 minutes before bed - that blue light is killing your melatonin. Take a warm shower, cool your room down to about 66 degrees. Some people swear by the 4-7-8 breathing technique - breathe in for 4 counts, hold for 7, out for 8. Try it tonight.\n\nAlso, no caffeine after 2 PM and no intense workouts within 3 hours of sleep. If you're still struggling after 2-3 weeks of this routine, you might want to get your thyroid checked or see a sleep specialist. Sometimes it's a medical thing.\n\nWhat time are you usually trying to sleep?";
        }
        if (msg.includes('how much') || msg.includes('how many hours') || msg.includes('hours') || msg.includes('need')) {
          return "Great question! So the amount of sleep you actually need is kinda personal. Most adults between 18 and 60 do best with about 7-9 hours, but honestly some people function perfectly on 7 and others need the full 9.\n\nHere's my suggestion - try sleeping naturally for a full week without an alarm. Just sleep when you're tired and wake when you naturally wake up. Track how many hours that is each night. Whatever the average is - that's your magic number.\n\nBut here's the thing - if you're getting 8 hours and still waking up exhausted, it's not about the hours, it's about the QUALITY. That usually means:\n\n1) You're not getting enough deep sleep - exercise 30 mins daily fixes this\n2) Sleep apnea - your breathing stops during sleep, see a doctor\n3) Vitamin D deficiency - take 2000 IU daily plus get morning sunlight\n4) Thyroid issues - getting this tested is cheap and easy\n\nMost people I talk to are just not sleeping WELL, not sleeping ENOUGH. What's your sleep like now - you waking up tired or just not enough hours?";
        }
        return "Sleep is super important but honestly most people are doing it wrong. Start with the basics - pick a bedtime like 10:30 PM and a wake time like 6:30 AM, then stick to it every single day, even weekends. I know, weekends are tempting, but consistency is everything for sleep.\n\nMake sure your bedroom is actually sleeping-friendly - dark, cool (around 65-66 degrees), and quiet. If you can't control the temperature, invest in a fan. Get morning sunlight within 30 minutes of waking up - this sets your body clock and is way more powerful than coffee.\n\nExercise during the day but not right before bed. Cut off caffeine at 2 PM. And dude, put your phone away at least an hour before sleep. The blue light literally stops melatonin production.\n\nDo this for 2 weeks consistently and you'll sleep like a rock. What's your current sleep situation - are you going to bed too late?";
      }
      
      // Exercise/Fitness questions
      if (msg.includes('exercise') || msg.includes('workout') || msg.includes('fitness') || msg.includes('gym') || msg.includes('run') || msg.includes('strength')) {
        if (msg.includes('beginner') || msg.includes('start') || msg.includes('never') || msg.includes('out of shape')) {
          return "Okay, I love this question because you're about to transform your life and it starts super simple. First week? Just walk. That's it. Three days a week, 20-minute walks at a pace where you can talk but not sing. Monday, Wednesday, Friday. Rest on the other days.\n\nSecond week, add two days of bodyweight stuff - nothing fancy. Just 10 pushups, 10 squats, 10 lunges on each leg, and hold a plank for 20 seconds. Do that circuit twice. Tuesday and Thursday. If 10 pushups is too hard, do them on your knees. No shame.\n\nWeek three and four? Same walks but bump them to 30 minutes. Same strength stuff but add 5 more reps to everything. By week four you'll be breathing easier, sleeping better, and feeling stronger.\n\nWeeks five to six? Start adding actual weight - even light dumbbells or water bottles work. Do 15 pushups, 15 squats, 12 lunges each leg, 30 second plank. Three rounds with 60 seconds rest between.\n\nHonestly? By week 6 you'll look in the mirror and be like 'whoa, I did that.' The secret is consistency beats intensity. Are you starting from basically zero fitness right now?";
        }
        if (msg.includes('how often') || msg.includes('days per week') || msg.includes('frequency') || msg.includes('how many times')) {
          return "Alright, so the frequency really depends on what you're trying to do. Let me break it down for you.\n\nIf you're trying to LOSE WEIGHT - which is what most people want - you need to do cardio five days a week. I'm talking 30 minutes of running, walking, cycling, swimming... whatever you'll actually do consistently. Then hit strength training twice a week on the off days to keep your muscle.\n\nIf you want to BUILD MUSCLE? Three days of heavy strength training, spread out so you're not hitting the same muscles two days in a row. So like chest on Monday, legs Wednesday, back Friday. With two or three lighter cardio days mixed in.\n\nIf you just want to stay HEALTHY and have energy? Four days a week is perfect - three days cardio, two days light strength. You can even do the same workout twice a week.\n\nThe absolute minimum to actually see changes? Three days a week, 30 minutes each. But four to five days is the sweet spot where results really start showing in 4-6 weeks.\n\nHonest truth though - consistency matters way more than intensity. Someone who walks three days every week for a year beats someone who goes crazy for two weeks then quits.\n\nWhat's your main goal here - weight loss, getting stronger, or just feeling better?";
        }
        if (msg.includes('weight loss') || msg.includes('lose weight') || msg.includes('fat loss')) {
          return "Okay, weight loss is my thing. Let me give you the real answer - it's not as complicated as people make it.\n\nFirst step? Find out how many calories your body burns daily. Search 'TDEE calculator' online, plug in your age, height, weight, and activity level. It'll give you a number like 2200. Write that down.\n\nSecond step? Eat 500 calories LESS than that number. So if your TDEE is 2200, eat 1700. That's it. You'll lose about one pound per week. Too slow? Cut another 200-300 calories, but don't go below 1400 or your metabolism tanks.\n\nThird step? Track your food for two weeks using the MyFitnessPal app. Everything. Every bite, every sip. It sucks but you NEED to do this to see what you're actually eating.\n\nFourth step? Add exercise. Do 30 minutes of walking or running on Monday, Wednesday, Friday. That burns another 250-300 calories and helps your body burn fat, not muscle.\n\nFifth step? Weigh yourself every Friday morning at the same time. If you're not losing anything after 2 weeks, you're either eating more than you think (be honest) or your calories are off.\n\nWhat to actually EAT? Chicken breast, eggs, fish, tons of broccoli, oatmeal, brown rice, almonds. These keep you full and burn your belly fat specifically.\n\nWhat to AVOID? Bread, pasta, soda, chips, fast food. These are calorie bombs.\n\nTimeline? You'll lose 3-5 pounds in week one (mostly water). Then steady 1-2 pounds per week. So realistically in 3 months you're down 12-16 pounds. Real, lasting weight loss.\n\nHow much weight are you trying to lose?";
        }
        return "So here's what I usually tell people about exercise - just start. Seriously, the best workout is the one you'll actually do. Pick something that doesn't sound awful - walking, running, cycling, swimming, whatever.\n\nFor most people trying to get healthy? Aim for 150 minutes a week of activity. That's like five 30-minute sessions or three 50-minute sessions. Mix in some strength training twice a week if you can.\n\nBut honestly, even 20 minutes three times a week is better than nothing. The key is consistency. Someone who walks 30 minutes three days a week for a year beats someone who does intense workouts for two weeks then gives up.\n\nWhat are you looking to get out of this - more energy, lose weight, get stronger?";
      }
      
      // Nutrition/Diet questions
      if (msg.includes('eat') || msg.includes('nutrition') || msg.includes('diet') || msg.includes('food') || msg.includes('calories')) {
        if (msg.includes('lose weight') || msg.includes('weight loss')) {
          return "Alright, so nutrition is honestly 80% of weight loss. You can't out-exercise a bad diet - I wish it worked that way but it doesn't.\n\nFirst thing - calculate your daily calorie burn. Search 'TDEE calculator' and plug in your stats. Then eat 500 calories less than that number. That's literally it. That creates a deficit that makes you lose a pound a week.\n\nNow, WHAT to eat. Protein is your best friend because it keeps you full longer. Chicken breast, eggs, fish, turkey - have protein at every single meal. Vegetables? Eat as much as you want, they're basically free calories. Fill half your plate with them.\n\nEven some great carbs like brown rice and oatmeal are fine in moderate amounts. Just skip bread, pasta, sugary stuff, fast food.\n\nPractical example day?\nBreakfast: Three eggs and oatmeal with banana\nLunch: Grilled chicken with broccoli and brown rice\nSnack: Apple with peanut butter\nDinner: Salmon with sweet potato and asparagus\n\nDrink a ton of water - like 10 glasses a day. Often when you think you're hungry you're actually just thirsty.\n\nUse MyFitnessPal app to track for two weeks. It sucks but you NEED to see what you're actually eating. Most people underestimate by 500+ calories.\n\nResults? First week you'll drop 3-5 pounds (mostly water). Then steady 1-2 pounds weekly. In 3 months? You're down 12-16 pounds.\n\nHow much are you looking to lose?";
        }
        if (msg.includes('healthy diet') || msg.includes('eat healthy') || msg.includes('what should i eat')) {
          return "So eating healthy doesn't have to be complicated. The simple rule I tell everyone is: half your plate vegetables, quarter plate protein, quarter plate whole grains.\n\nThat's seriously it. You do that and you're healthy.\n\nProtein sources? Chicken breast is the easiest. Cook a bunch on Sunday and use it for meals all week. Eggs are stupid cheap and fast. Fish like salmon is amazing for you. Turkey, lean beef, whatever.\n\nVegetables? Literally any. Broccoli, spinach, carrots, peppers, asparagus - eat as much as you want. They fill you up without wrecking your calorie budget.\n\nGood carbs? Brown rice, sweet potato, oatmeal, whole grain bread. Not too much, but they're not evil either.\n\nHealthy fats? Olive oil, almonds, avocado. Just use them in reasonable amounts.\n\nExample meals:\nBreakfast: Oatmeal with banana and almonds, or scrambled eggs with toast and fruit\nLunch: Grilled chicken, brown rice, and roasted broccoli\nDinner: Salmon with sweet potato and asparagus\nSnacks: Apple, almonds, Greek yogurt\n\nDrink water mostly. Coffee and tea are fine. Cut out soda, energy drinks, all that sugary stuff.\n\nHonestly? If you just do this basic thing consistently, you'll be healthier, have more energy, sleep better, look better. Not overnight but in 4-6 weeks you'll notice.\n\nAre you cooking for yourself or eating out a lot?";
        }
        if (msg.includes('meal prep') || msg.includes('cook')) {
          return "Oh man, meal prep is a game changer. Spend 2-3 hours on Sunday and you basically don't think about food all week. It's clutch.\n\nHere's what I do: Pick three proteins - maybe grilled chicken, ground turkey, and salmon. Season them different ways so they don't get boring. Cook all of it in bulk.\n\nThen cook some sides - brown rice, sweet potatoes, quinoa. Chop up a ton of vegetables - broccoli, asparagus, peppers, whatever you like.\n\nThrow them into glass containers in different combos. Chicken with rice and broccoli. Turkey with sweet potato and asparagus. Salmon with quinoa and peppers. Whatever sounds good.\n\nLabel them with the date. They last 4-5 days in the fridge. Now Monday through Friday breakfast you grab a container, pop it in the microwave, done.\n\nFor lunches? Same deal. It saves you like $50-100 a week compared to eating out. Plus you're eating healthy without having to think about it.\n\nThe key is picking foods you actually like. If you hate broccoli, don't meal prep broccoli. There's plenty of other vegetables.\n\nDo you have time to cook on Sundays?";
        }
        return "Nutrition is honestly the easiest thing to fix once you get it right. The basics are super simple - real whole foods, protein at every meal, mostly vegetables, reasonable carbs.\n\nDon't overthink it. You don't need to count macros or anything crazy. Just eat actual food, not processed stuff. Cook when you can. Drink water.\n\nAre you trying to lose weight, gain muscle, or just eat healthier?";
      }
      
      // Energy/Fatigue questions
      if (msg.includes('energy') || msg.includes('tired') || msg.includes('fatigue') || msg.includes('exhausted')) {
        if (msg.includes('always tired') || msg.includes('constantly tired')) {
          return "Okay, constant tiredness is rough but usually fixable. First thing - how's your sleep? Are you actually getting 7-9 hours every night? And I mean actually sleeping well, not just lying in bed.\n\nSecond thing - are you exercising? Even a little? Because like 30 minutes of walking a day genuinely changes your energy levels in a week. It sounds backwards but tired people need to move.\n\nThird - drinking enough water? Most people are chronically dehydrated and just think they're tired.\n\nFourth - eating regularly? Skipping meals tanks your energy. You need protein and carbs throughout the day.\n\nHonest timeline: If you fix these four things - sleep, movement, water, eating - you'll feel noticeably different in ONE WEEK. Not even two weeks. In one week.\n\nBut if you're sleeping 8 hours, exercising, hydrated, eating well and STILL exhausted after 4 weeks? Then you might need to see a doctor. Could be vitamin D deficiency, iron deficiency, thyroid issues, whatever. Get some blood work.\n\nWhat's your sleep situation like right now?";
        }
        if (msg.includes('afternoon') || msg.includes('3pm') || msg.includes('after lunch')) {
          return "Oh man, the afternoon crash is so common and it drives me crazy because it's like 90% fixable.\n\nHere's what's happening - you probably had a heavy lunch or something with a lot of simple carbs. Your blood sugar spikes, then crashes hard. Or you skipped breakfast so you're just running on fumes.\n\nHow to actually fix it:\n\nFirst, EAT BREAKFAST. Seriously. Eggs and toast or oatmeal. It prevents the crash entirely.\n\nSecond, at lunch eat some PROTEIN. Like actual chicken or fish. Protein keeps your blood sugar stable. Avoid going all-in on pasta or bread - that's what triggers the crash.\n\nThird, around 2-3 PM when you feel it coming? Don't reach for coffee. Drink a big glass of water instead. Grab an apple or some almonds. Seriously, that works.\n\nFourth, get up and move. Even a 10-minute walk at 2 PM completely changes your afternoon.\n\nDo these things consistently for a week and your afternoon is way better. The energy crash just goes away.\n\nWhat's your breakfast situation like?";
        }
        return "So if you're feeling tired right now, the immediate fix is stupid simple. Drink two big glasses of water right now. Eat something with protein and carbs - like a banana with peanut butter. Get up and move around for 10 minutes.\n\nSeriously, that works for right now.\n\nFor the bigger picture though? Your energy comes down to four things: Sleep, exercise, food, and water. You can't out-hack those. If all four of those are solid, you'll have energy.\n\nMost people who are tired are either sleeping bad, not moving enough, or not eating right. Usually all three.\n\nWhat's the main reason you think you're tired - bad sleep, not exercising, diet, or something else?";
      }
      
      // Weight management
      if (msg.includes('weight') || msg.includes('lose') || msg.includes('gain')) {
        if (msg.includes('how to lose') || msg.includes('lose weight')) {
          return "Weight loss blueprint:\n\nSTEP 1: Know your baseline\n- Calculate daily calorie needs (TDEE)\n- Weigh yourself weekly (same day/time)\n- Take starting photos\n\nSTEP 2: Eat right\n- Eat 500 cal below needs = 1 lb/week loss\n- Track food for 2 weeks\n- High protein diet (retains muscle)\n- Vegetables = fill you up\n\nSTEP 3: Move more\n- 150 min cardio/week\n- 2-3x strength training\n- This preserves muscle while losing fat\n\nSTEP 4: Track progress\n- Weekly weighing\n- Monthly measurements\n- How clothes fit\n- Energy levels\n\nTIMELINE:\n- Week 1: Initial water loss (3-5 lbs)\n- Week 2-8: Steady loss (1-2 lbs/week)\n- Month 3: Plateau (adjust calories)\n- Month 6: 12-16 lbs gone\n\nKEY: Sustainable beats fast. 1-2 lbs/week is healthy and realistic.";
        }
        if (msg.includes('how much weight') || msg.includes('healthy weight')) {
          return "Healthy weight range:\n\nCALCULATE BMI:\n- Search 'BMI calculator'\n- Enter height and weight\n- Use as guide (not perfect)\n\nHEALTHY BMI: 18.5-24.9\n\nEXAMPLE:\n- 5'10\" = 130-180 lbs healthy\n- 5'6\" = 115-160 lbs healthy\n- 6' = 135-200 lbs healthy\n\nBUT REMEMBER:\n- Muscle weighs more than fat\n- Strength training increases weight\n- Look at how you feel, not just scale\n\nBETTER METRICS:\n- Body measurements\n- Energy levels\n- How clothes fit\n- Strength gains\n- Overall health\n\nConsult a doctor for your ideal weight based on muscle mass and health.";
        }
        return "Weight management:\n\nTRACK:\n- Scale weekly\n- Measurements monthly\n- Progress photos\n\nEAT:\n- Real whole foods\n- Adequate protein\n- Vegetables at every meal\n- Calorie awareness\n\nMOVE:\n- Daily activity\n- 3-5 exercise sessions/week\n- Mix cardio + strength\n\nSLEEP:\n- 7-9 hours\n- Consistent schedule\n\nFocus on sustainable changes, not quick fixes.";
      }
      
      // Heart/Cardiovascular health
      if (msg.includes('heart') || msg.includes('cardio') || msg.includes('blood pressure')) {
        if (msg.includes('improve') || msg.includes('better heart')) {
          return "Heart health plan:\n\nEXERCISE (most important):\n- 150 min moderate cardio/week\n- Examples: brisk walk, running, cycling, swimming\n- 20-30 mins, 5 days/week\n- This directly improves heart health\n\nNUTRITION:\n- Omega-3 foods (salmon, walnuts, flax)\n- Reduce sodium (< 2300 mg/day)\n- Limit saturated fat (< 10% calories)\n- More fiber (whole grains, vegetables)\n- Avoid trans fats\n\nWEIGHT:\n- If overweight, even 5% loss helps\n- Reduces heart strain\n\nSTRESS:\n- Meditation (10 mins daily)\n- Exercise (stress relief)\n- Sleep (7-9 hours)\n- Social connection\n\nAVOID:\n- Smoking\n- Excessive alcohol\n- Processed foods\n\nCHECKUPS:\n- Annual health screening\n- Blood pressure monitoring\n- Cholesterol check\n\nResults in 4-8 weeks with consistency.";
        }
        if (msg.includes('blood pressure') || msg.includes('hypertension')) {
          return "Lower blood pressure:\n\nDIET (DASH diet works):\n- More fruits/vegetables (8-10/day)\n- Whole grains\n- Lean proteins\n- Low sodium (< 2300 mg)\n- Reduce caffeine\n\nEXERCISE:\n- 30 mins moderate activity, 5 days/week\n- Brisk walking works\n- Lowers BP in 2-4 weeks\n\nWEIGHT:\n- Lose 10 lbs = lower BP\n- Even 5% loss helps\n\nSTRESS:\n- Meditation 10 mins/day\n- Deep breathing\n- Yoga\n- Regular sleep\n\nLIMIT:\n- Sodium\n- Alcohol\n- Caffeine\n\nTRACK:\n- Monitor at home or pharmacy\n- Same time daily\n- Note improvements\n\nNORMAL: < 120/80\nHIGH: > 140/90\nConsult doctor if persistently high.";
        }
        return "Cardiovascular health:\n\nBEST ACTIVITIES:\n- Brisk walking\n- Running\n- Cycling\n- Swimming\n- Any 30-min cardio\n\nFREQUENCY:\n- 150 min/week moderate\n- 75 min/week vigorous\n- 5 days/week is ideal\n\nDIET:\n- Whole grains\n- Vegetables\n- Lean protein\n- Healthy fats (olive oil, nuts)\n- Less sodium\n\nLIFESTYLE:\n- Sleep 7-9 hours\n- Manage stress\n- Avoid smoking\n- Limit alcohol\n\nResults visible in 4-8 weeks.";
      }
      
      // Stress management
      if (msg.includes('stress') || msg.includes('anxiety') || msg.includes('overwhelm') || msg.includes('panic')) {
        if (msg.includes('reduce') || msg.includes('manage') || msg.includes('cope')) {
          return "Stress management techniques:\n\nIMMEDIATE (right now):\n1. Box breathing (4 counts each):\n   - Breathe in 4 counts\n   - Hold 4 counts\n   - Out 4 counts\n   - Hold 4 counts\n   - Repeat 5 times\n\n2. 5-4-3-2-1 grounding:\n   - 5 things you see\n   - 4 things you feel\n   - 3 things you hear\n   - 2 things you smell\n   - 1 thing you taste\n\nDAILY HABITS (build these):\n✓ Exercise 30 mins (reduces stress hormone)\n✓ Meditation 10 mins (morning or night)\n✓ Journal 5 mins (clear your head)\n✓ Sleep 8 hours (crucial)\n✓ Limit caffeine\n\nWEEKLY:\n✓ Time with friends\n✓ Hobby time\n✓ Nature time\n✓ Yoga or stretching\n\nWORK STRESS:\n✓ Prioritize tasks\n✓ Take breaks every 60 mins\n✓ Don't check email after work\n✓ Set boundaries\n\nSEE PROFESSIONAL IF:\n- Stress interferes with daily life\n- Doesn't improve in 2-4 weeks\n- Having panic attacks\n- Thoughts of self-harm";
        }
        if (msg.includes('meditation') || msg.includes('relax')) {
          return "Meditation for stress:\n\nEASY 10-MIN ROUTINE:\n1. Sit comfortably\n2. Set timer 10 mins\n3. Close eyes\n4. Focus on breathing\n5. Mind wanders? Redirect gently\n6. Don't judge yourself\n\nWHEN:\n- Morning (sets mood)\n- Evening (before bed)\n- Whenever stressed\n\nAPPS:\n- Headspace (paid)\n- Calm (paid)\n- Insight Timer (free)\n- Meditate (free)\n\nBENEFITS:\n- 2 weeks: Feel calmer\n- 4 weeks: Anxiety decreases\n- 8 weeks: Major stress reduction\n- Continues improving\n\nSTART WITH 5 MINS if hard to focus. Increase gradually.\n\nCOMBINE WITH:\n- Exercise\n- Sleep\n- Journaling\n- Social support\n\nMeditation is proven to reduce anxiety and stress.";
        }
        return "Manage stress:\n\nQUICK RELIEF:\n- Deep breathing (2 mins)\n- Walk outside (10 mins)\n- Call a friend\n- Drink water\n- Stretch\n\nDAILY:\n- Sleep 8 hours\n- Exercise 30 mins\n- Eat well\n- Limit caffeine\n- One hobby\n\nWEEKLY:\n- Social time\n- Nature time\n- Relaxation\n- Meditation\n- Plan next week\n\nAVOID:\n- Overcommitting\n- Negative people\n- Excessive phone\n- Too much caffeine\n- Poor sleep\n\nMost stress improves with sleep, exercise, and boundaries.";
      }
      
      // General health
      return "I'm here to help with health questions!\n\nI can provide specific advice on:\n\n💤 Sleep - Duration, quality, problems\n💪 Exercise - Programs, frequency, goals\n🥗 Nutrition - Meal plans, weight loss, diet\n⚡ Energy - Boosting, fatigue, timing\n⚖️ Weight - Loss, gain, healthy range\n❤️ Heart health - Cardio, blood pressure\n🧘 Stress - Management, anxiety, relaxation\n\nFor best help:\n- Ask specific questions\n- Tell me your goal\n- Share relevant details\n\nExample: \"I want to lose 20 pounds in 3 months, I work desk job, barely exercise\"\n\nWhat's your health question?";
    };

    return getIntentResponse();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.chat(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (err) {
      // Demo mode fallback with intelligent responses
      const errorMessage = err.response?.data?.message || err.message || 'Failed to get response';
      
      if (err.response?.status === 429) {
        setError('Rate limit reached. Please try again later.');
        setMessages(prev => prev.slice(0, -1));
      } else if (err.message?.includes('ERR_NETWORK') || err.message?.includes('Failed to fetch') || err.code === 'ERR_NETWORK') {
        // Backend not running, demo mode - provide intelligent response
        const demoResponse = getAIResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: demoResponse }]);
      } else {
        setError(errorMessage);
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>AI Health Assistant</h1>
      <p className="page-subtitle">Chat with your personal health advisor</p>

      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <p>👋 Hi! I'm your health assistant. Ask me anything about your health and wellness!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="chat-message assistant-message">
              <div className="message-content typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            disabled={loading}
            className="chat-input"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            loading={loading}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
