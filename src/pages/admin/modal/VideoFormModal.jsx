// src/pages/admin/modal/VideoFormModal.jsx
import useAdminVideosStore from '../../../store/useAdminVideosStore';

export default function VideoFormModal({ mode = 'create', onClose, onSuccess }) {
  const {
    form, files,
    setFormField, setFile,
    submitCreate, submitUpdate,
  } = useAdminVideosStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit' && form._id) {
        await submitUpdate(form._id);
      } else if (mode === 'edit' && form.id) {
        await submitUpdate(form.id);
      } else {
        await submitCreate();
      }
      onSuccess?.();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || '저장 실패');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>{mode === 'edit' ? '영상 수정' : '영상 등록'}</h2>

        <form className="video-form" onSubmit={onSubmit}>
          <div className="row-2">
            <label>
              한글 제목 *
              <input
                value={form.koTitle}
                onChange={(e) => setFormField('koTitle', e.target.value)}
                required
              />
            </label>
            <label>
              영문 제목 *
              <input
                value={form.enTitle}
                onChange={(e) => setFormField('enTitle', e.target.value)}
                required
              />
            </label>
          </div>

          <div className="row-3">
            <label>
              년도
              <input
                type="number"
                value={form.year}
                onChange={(e) => setFormField('year', e.target.value)}
              />
            </label>
            <label>
              관람 제한
              <select
                value={form.limit}
                onChange={(e) => setFormField('limit', e.target.value)}
              >
                <option value="ALL">ALL</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="19">19</option>
              </select>
            </label>
            <label>
              카테고리
              <input
                value={form.category}
                onChange={(e) => setFormField('category', e.target.value)}
              />
            </label>
          </div>

          <div className="row-2">
            <label>
              영상 시간(분)
              <input
                type="number"
                value={form.runtime}
                onChange={(e) => setFormField('runtime', e.target.value)}
              />
            </label>
            <label>
              YouTube ID *
              <input
                value={form.youtubeId}
                onChange={(e) => setFormField('youtubeId', e.target.value)}
                required
              />
            </label>
          </div>

          <label className="full">
            설명
            <textarea
              value={form.desc}
              onChange={(e) => setFormField('desc', e.target.value)}
              placeholder="간단한 소개를 입력하세요."
            />
          </label>

          <div className="row-2 files">
            <label>
              메인 비주얼 (visual)
              <input type="file" accept="image/*" onChange={(e) => setFile('visual', e.target.files?.[0] || null)} />
              {files.visual ? <small>{files.visual.name}</small> : null}
            </label>
            <label>
              썸네일 (thumb)
              <input type="file" accept="image/*" onChange={(e) => setFile('thumb', e.target.files?.[0] || null)} />
              {files.thumb ? <small>{files.thumb.name}</small> : null}
            </label>
          </div>

          <div className="actions">
            <button type="button" onClick={onClose}>취소</button>
            <button className="primary" type="submit">
              {mode === 'edit' ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
