exports.handler = async function(event, context){
  try{
    const body = event.body ? JSON.parse(event.body) : {};
    const questId = body.quest_id || 'demo_quest';
    const step = body.step || 1;
    const preferred = body.preferred || 'audio+video';
    const audio_uri = '/assets/sample_audio_short.mp3';
    const video_uri = '/assets/sample_video_short.mp4';
    const transcript = `Mock transcript for ${questId} step ${step}.`;
    const av_response = {
      audio: preferred.includes('audio') ? {type:'file',uri:audio_uri,duration_sec:12,transcript} : null,
      video: preferred.includes('video') ? {type:'file',uri:video_uri,duration_sec:14,caption:'Demo caption'} : null,
      sfx:[{name:'level_up',uri:'/assets/sfx_level_up.mp3'}],
      captions:transcript, accessibility:{transcript,alt_text:'Demo alt'}, playback_instructions:{autoplay:false,loop:false,muted_by_default:true}
    };
    const game_state = {quest_id:questId, step, xp_earned:10};
    return { statusCode:200, body: JSON.stringify({status:'ok', av_response, game_state}) };
  }catch(e){ return {statusCode:500, body: JSON.stringify({error:String(e)})}; }
}
