'use client'

const prompts = [
  {
    icon: 'ti-file-text',
    title: 'Summarize Case',
    description: 'Generate an AI case summary',
  },
  {
    icon: 'ti-scale',
    title: 'Legal Research',
    description: 'Search judgments & precedents',
  },
  {
    icon: 'ti-users',
    title: 'Cross Examination',
    description: 'Generate witness questions',
  },
  {
    icon: 'ti-bulb',
    title: 'Strategy',
    description: 'Suggest litigation strategy',
  },
  {
    icon: 'ti-shield-check',
    title: 'Evidence Review',
    description: 'Analyze evidence strength',
  },
]

export default function AIChat() {
  return (
    <div>

      {/* ================= HEADER ================= */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            AI Chat
          </h2>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 14,
            }}
          >
            Ask Clausio anything about your cases, legal research or court documents.
          </p>
        </div>

        <button
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '11px 18px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          <i
            className="ti ti-plus"
            style={{ marginRight: 8 }}
          />
          New Conversation
        </button>
      </div>

      {/* ================= SUGGESTED PROMPTS ================= */}

      <div
        style={{
          marginBottom: 28,
        }}
      >
        <h3
          style={{
            marginBottom: 16,
            color: '#0f172a',
          }}
        >
          Suggested Prompts
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 16,
          }}
        >
          {prompts.map((item) => (
            <div
              key={item.title}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 18,
                cursor: 'pointer',
                transition: '.2s',
              }}
            >
              <i
                className={`ti ${item.icon}`}
                style={{
                  fontSize: 24,
                  color: '#2563eb',
                }}
              />

              <div
                style={{
                  marginTop: 14,
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: '#64748b',
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONVERSATION ================= */}

      <div
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 18,
          padding: 24,
          minHeight: 420,
        }}
      >
        {/* AI Message */}

        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#2563eb',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <i className="ti ti-robot" />
          </div>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: 14,
              padding: 18,
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 10,
                color: '#0f172a',
              }}
            >
              Clausio AI
            </div>

            <div
              style={{
                color: '#334155',
                lineHeight: 1.8,
              }}
            >
              Hello 👋

              <br />
              <br />

              I'm your AI legal assistant.

              <br />
              <br />

              I can help you with:

              <ul
                style={{
                  marginTop: 12,
                }}
              >
                <li>Legal Research</li>
                <li>Case Analysis</li>
                <li>Cross Examination</li>
                <li>Evidence Review</li>
                <li>Strategy Suggestions</li>
                <li>Document Understanding</li>
                <li>Court Judgments</li>
                <li>Client Communication</li>
              </ul>

              Start by asking me a question below.
            </div>
          </div>
        </div>
                {/* ================= AI RESPONSE CARDS ================= */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 18,
            marginBottom: 28,
          }}
        >
          {[
            {
              icon: 'ti-file-text',
              title: 'Case Summary',
              value: 'Generated',
              color: '#2563eb',
            },
            {
              icon: 'ti-scale',
              title: 'Relevant Judgments',
              value: '18 Found',
              color: '#16a34a',
            },
            {
              icon: 'ti-alert-triangle',
              title: 'Risk Score',
              value: 'Medium',
              color: '#f59e0b',
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 18,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    color: '#64748b',
                    fontSize: 13,
                  }}
                >
                  {card.title}
                </span>

                <i
                  className={`ti ${card.icon}`}
                  style={{
                    color: card.color,
                    fontSize: 20,
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* ================= FOLLOW-UP QUESTIONS ================= */}

        <div
          style={{
            marginBottom: 28,
          }}
        >
          <h3
            style={{
              marginBottom: 14,
              color: '#0f172a',
            }}
          >
            Suggested Follow-up Questions
          </h3>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            {[
              'Summarize this petition',
              'Find contradictory statements',
              'Suggest cross examination questions',
              'Research similar judgments',
              'Explain Section 125 CrPC',
              'Generate litigation strategy',
            ].map((question) => (
              <button
                key={question}
                style={{
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid #dbe3ef',
                  background: '#fff',
                  cursor: 'pointer',
                  fontWeight: 500,
                  color: '#334155',
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* ================= RECENT CONVERSATIONS ================= */}

        <div>
          <h3
            style={{
              marginBottom: 14,
              color: '#0f172a',
            }}
          >
            Recent Conversations
          </h3>

          {[
            {
              title: 'Divorce Petition Summary',
              time: 'Today • 10:42 AM',
            },
            {
              title: 'Maintenance Case Research',
              time: 'Yesterday • 4:18 PM',
            },
            {
              title: 'Cross Examination Preparation',
              time: 'Yesterday • 11:25 AM',
            },
          ].map((chat) => (
            <div
              key={chat.title}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 18px',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: '#0f172a',
                  }}
                >
                  {chat.title}
                </div>

                <div
                  style={{
                    marginTop: 4,
                    color: '#64748b',
                    fontSize: 13,
                  }}
                >
                  {chat.time}
                </div>
              </div>

              <button
                style={{
                  border: 'none',
                  background: '#eff6ff',
                  color: '#2563eb',
                  borderRadius: 8,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
                {/* ================= INPUT AREA ================= */}

        <div
          style={{
            marginTop: 32,
            borderTop: '1px solid #e2e8f0',
            paddingTop: 24,
          }}
        >
          {/* Quick Actions */}

          <div
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 18,
              flexWrap: 'wrap',
            }}
          >
            <button style={actionButton}>
              <i className="ti ti-paperclip" />
              Attach PDF
            </button>

            <button style={actionButton}>
              <i className="ti ti-photo" />
              Upload Image
            </button>

            <button style={actionButton}>
              <i className="ti ti-microphone" />
              Voice
            </button>

            <button style={actionButton}>
              <i className="ti ti-world-search" />
              Research
            </button>

            <button style={actionButton}>
              <i className="ti ti-download" />
              Export Chat
            </button>

            <button style={actionButton}>
              <i className="ti ti-trash" />
              Clear
            </button>
          </div>

          {/* Chat Input */}

          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-end',
            }}
          >
            <textarea
              placeholder="Ask Clausio anything... (e.g. Summarize this petition, find relevant judgments, generate cross-examination questions...)"
              rows={4}
              style={{
                flex: 1,
                resize: 'none',
                border: '1px solid #dbe3ef',
                borderRadius: 12,
                padding: 16,
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />

            <button
              style={{
                height: 56,
                padding: '0 24px',
                border: 'none',
                borderRadius: 12,
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="ti ti-send" />
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ================= BUTTON STYLE ================= */

const actionButton: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 16px',
  background: '#fff',
  border: '1px solid #dbe3ef',
  borderRadius: 10,
  cursor: 'pointer',
  fontWeight: 600,
  color: '#334155',
  fontSize: 14,
}